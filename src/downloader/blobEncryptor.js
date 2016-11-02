var path = require('path');
var blobEncryptor = (function() {
    try {
        /**
         * This library is used to enc/dec a blob file in fast way with javascript. It support most browsers and can work on Nodejs
         *
         * @class blobEncryptor
         */
        var keyLength = 128;
        var debug = false;


        /**
         * Encrypt the blob using key
         * @method encryptFile
         * @param {Blob} blob A blob file to be encrypted.
         * @param {String} str A chosen passphrase used to encrypt the blob.
         * @param {Function} cb A callback will return an encrypted blob
         * @return undefined
         */
        function encryptFile(blob, str, cb) {
            // body...
            var all = [];
            var list = generateList(blob.size, str, getK(blob.size, 1), true);
            debugLog(list)
            for (var i = list.length; i >= 0; i--) {
                if (i === 0) {
                    all.push(blob.slice(0, list[i]))
                    debugLog(0, list[i], i)
                } else if (i === list.length) {
                    all.push(blob.slice(list[i - 1], blob.size))
                    debugLog(list[i - 1], blob.size, i)
                } else {
                    all.push(blob.slice(list[i - 1], list[i]))
                    debugLog(list[i - 1], list[i], i)
                }
            }
            var b = new Blob(all, {
                type: 'video/mp4'
            })
            if (cb)
                cb(b);
        }


        /**
         * Decrypt the blob using key
         * @method decryptFile
         * @param {Blob} blob A blob file to be decrypted.
         * @param {String} str A chosen passphrase used to decrypt the blob.
         * @param {Function} cb A callback will return a decrypted blob
         * @return undefined
         */
        function decryptFile(blob, str, cb) {
            // body...
            var all = [];
            var list = generateList(blob.size, str, getK(blob.size, 1), false);
            for (var i = list.length - 1; i >= 0; i--) {
                if (i === 0) {
                    all.push(blob.slice(0, list[i]))
                    debugLog(0, list[i], i)
                } else {
                    all.push(blob.slice(list[i - 1], list[i]))
                    debugLog(list[i - 1], list[i], i)
                }
            }
            var b = new Blob(all, {
                type: 'video/mp4'
            })
            if (cb)
                cb(b);
        }

        /**
         * Get blob from specific url
         * @method getBlob.
         * @param {String} url A url for the file.
         * @param {Function} cb A callback will return a blob
         * @return undefined
         */
        var getBlob = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onload = function() {
                var file = xhr.response;
                if (callback)
                    callback(file);
            }
            xhr.send();
        };


        /**
         * Set enc/dec key length (128/256/512)
         * @method setKeyLength
         * @param {Integer} x The length for setting key.
         * @return undefined
         */
        function setKeyLength(x) {
            switch (Number(x)) {
                case 128:
                    keyLength = 128;
                    break;
                case 256:
                    keyLength = 256;
                    break;
                case 512:
                    keyLength = 512;
                    break;
                default:
                    keyLength = 128;
                    break;
            }
        }

        /* convert string to hex */
        String.prototype.hexEncode = function() {
            var hex, i;

            var result = "";
            for (i = 0; i < this.length; i++) {
                hex = this.charCodeAt(i).toString(16);
                result += ("000" + hex).slice(-4);
            }

            return result
        }

        /* convert hex to string */
        String.prototype.hexDecode = function() {
            var j;
            var hexes = this.match(/.{1,4}/g) || [];
            var back = "";
            for (j = 0; j < hexes.length; j++) {
                back += String.fromCharCode(parseInt(hexes[j], 16));
            }

            return back;
        }

        /* convert integer to hex */
        function intToHex(num) {
            return num.toString(16);
        }

        /* convert hex to integer */
        function hexToInt(hexString) {
            return parseInt(hexString, 16);
        }

        /* get number of permutations */
        function getK(size, start) {
            var len = 256;
            var n = parseInt(size);
            var k = parseInt(start);
            var c = LnComb(n, k) / Math.LN2;
            if (c >= len) return k;
            else {
                k += 1;
                return getK(size, k);
            }
        }

        function generateList(size, str, k, enc) {
            var num = hexToInt(str.hexEncode());
            var step = Math.round(num / k);
            var list = [];
            for (var i = 0; i < k; i++) {
                list.push(((num * i) + step) % size);
            }
            if (enc == true)
                return list.sort(sortNumber);
            else
                return inverseArray(list.sort(sortNumber), size);
            //return list.join(",")
        }

        function sortNumber(a, b) {
            return a - b;
        }

        function sortNumber2(a, b) {
            return b - a;
        }

        function inverseArray(list, size) {
            list.sort(sortNumber2);
            debugLog(list)
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                if (i === 0) {
                    var b = size - list[i];
                    newList.push(b);
                    debugLog(b)
                } else {
                    debugLog(newList[i - 1], list[i], list[i - 1])
                    newList.push(newList[i - 1] + list[i - 1] - list[i]);
                }
            }
            newList.push(newList[list.length - 1] + list[list.length - 1]);
            return newList;
        }

        function Fact(x) {
            // x factorial
            if ((x >= 180) || (x != Math.round(x)))
                return -1;

            var t = 1;
            while (x > 1)
                t *= x--;
            return t;
        }

        function LnComb(n, k) {
            if ((k == 0) || (k == n)) return 0;
            else if ((k > n) || (k < 0)) return -1;
            else
                return (LnFact(n) - LnFact(k) - LnFact(n - k));
        }

        function LnFact(x) {
            // ln(x!) by Stirling's formula
            //   see Knuth I: 111
            if (x <= 1) x = 1;

            if (x < 12)
                return Math.log(Fact(Math.round(x)));
            else {
                var invx = 1 / x;
                var invx2 = invx * invx;
                var invx3 = invx2 * invx;
                var invx5 = invx3 * invx2;
                var invx7 = invx5 * invx2;

                var sum = ((x + 0.5) * Math.log(x)) - x;
                sum += Math.log(2 * Math.PI) / 2;
                sum += (invx / 12) - (invx3 / 360);
                sum += (invx5 / 1260) - (invx7 / 1680);

                return sum;
            }
        }

        /*
         input :
         name : the name will used to save file.
         blob: the blob file.
         output: no specific output, but the execution will result saved file on the system
         */
        function saveToDesk(name, ab, cb) {
            if (window.cordova) {
                var dirName = path.dirname(name);
                var fileName = path.basename(name);
                var blob = new Blob([ab], {type: 'video/MP2T'})
                // encryptFile(blob,name,function (blob2) {
                    $cordovaFile.writeFile(dirName, fileName, blob, true)
                        .then(function (success) {
                            // success
                            if (cb) {
                                cb(true)
                            }
                        }, function (error) {
                            // error
                            if (cb) {
                                cb(false)
                            }
                        });
                // });
            }
        }

        /*
         input :
         name : the name will used to get file.
         output: blob: the blob file.
         */
        function getFromDesk(name,cb) {
            if (window.cordova) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", name);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    var blob = xhr.response;
                    decryptFile(blob,name,function (file) {
                        file.name = name + ".ts"
                        if(cb) cb(file);
                    })
                }
                xhr.send();
            }
        }

        function debugLog(log) {
            if(debug === true){
                console.log(log);
            }
        }
        return {
            encryptFile: encryptFile,
            decryptFile: decryptFile,
            setKeyLength: setKeyLength,
            getBlob:getBlob,
            saveToDesk:saveToDesk
        }
    } catch (err) {
        console.log(err);
    }
})();
module.exports = blobEncryptor;