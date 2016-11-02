var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Decrypter = require('./decrypter.js');
var blobEncryptor = require('./blobEncryptor.js');

var s = 0;
var sLabel = "";
var WriteData = {};
WriteData.paused = false;

var writeFile = function (file, content, totalSegments,speed, cb) {
    if (window.cordova) {
        blobEncryptor.saveToDesk(file,toArrayBuffer(content));
    }

    if (cb) cb(toArrayBuffer(content), totalSegments,speed,file);
    return;
};

var requestFile2 = function (uri) {
    return new Promise(function (resolve, reject) {
        mojFetch(uri, function (data,speed) {
            return resolve({d:data,s:speed});
        })
    });
}

var toArrayBuffer = function (buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
};

var newDecryptFile = function (content, key, IV) {
    return new Promise(function (resolve, reject) {
        var segmentData = new Uint8Array(content)
        new Decrypter(segmentData, key, IV, function (err, data) {
            // var ab = toArrayBuffer(data);
            // var blob = new Blob([ab]);
            // var url = URL.createObjectURL(blob);
            // console.log(url)
            return resolve(new Buffer(data));
        });
    });
};
WriteData.exec = function (decrypt, concurrency, resources, finishedSegments, cb) {
    var inProgress = [];
    var operations = [];
    var totalSegments = resources.length;
    // var resource = resources.slice(startSegment);

    resources.forEach(function (r) {
        if(!inArray(finishedSegments,r.file)){
            if (r.content) {
                operations.push(function () {
                    return writeFile(r.file, r.content, totalSegments,"", cb);
                });
            } else if (r.key && decrypt) {
                operations.push(function () {
                    var ss;
                    return requestFile2(r.uri).then(function (content) {
                        ss = content.s;
                        return newDecryptFile(content.d, r.key.bytes, r.key.iv).then(function (content) {
                            return writeFile(r.file, content, totalSegments,ss, cb)
                        });
                    });
                });
            } else if (inProgress.indexOf(r.uri) === -1) {
                operations.push(function () {
                    return requestFile2(r.uri).then(function (content) {
                        return writeFile(r.file, content.d, totalSegments,content.s, cb);
                    });
                });
                inProgress.push(r.uri);
            }
        }

    });

    return Promise.map(operations, function (o) {
        if(WriteData.paused == true) {console.log('exit()'); return;};
        return Promise.join(o());
    }, {concurrency: concurrency}).all(function (o) {
        console.log('DONE!');
        return Promise.resolve();
    });
};
var mojFetch = function (url, callback) {
    var startTime = new Date();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function () {
        var file = xhr.response;
        var reader = new window.FileReader();
        reader.onload = (function () {
            return function (e) {
                var endTime = new Date();
                var speed = (e.target.result.byteLength / (endTime - startTime)) * 1000;
                s = Math.max(s,speed);
                sLabel = prettyByte(s);
                if (callback)
                    callback(e.target.result,prettyByte(speed));
            };
        })(file);
        reader.readAsArrayBuffer(file);
    }
    xhr.send();
};
var prettyByte = function (num) {
    var UNITS = ['Bps', 'kBps', 'MBps', 'GBps', 'TBps', 'PBps', 'EBps', 'ZBps', 'YBps'];
    if (!Number.isFinite(num)) {
        throw new TypeError('Expected a finite number, got ${typeof num}: ${num}');
    }
    const neg = num < 0;
    if (neg) {
        num = -num;
    }
    if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
    }
    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), UNITS.length - 1);
    const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
    const unit = UNITS[exponent];
    return (neg ? '-' : '') + numStr + ' ' + unit;
};

var inArray = function (arr,el) {
    return !!~arr.indexOf(el);
}




module.exports = WriteData;
