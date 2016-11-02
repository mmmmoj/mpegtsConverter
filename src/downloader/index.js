var WalkManifest = require('./walk-manifest');
var WriteData = require('./write-data');
var path = require('path');

var mojDownloader = function (options, cb, progress, errcb) {
    var controller = {
        self: null,
        finishedSegments: [],
        bBufer: [],
        event: null,
        basePath: null,
        init: function () {
            self = this;
            self.event = 'init';
            self.finishedSegments = options.finishedSegments || [];
            self.bBufer = [];
            self.basePath = path.join(options.output, path.basename(options.input).replace('.m3u8', ''));
            if (window.cordova) {
                self.basePath = path.join(cordova.file.applicationStorageDirectory, self.basePath);
                var firstDir = path.join(cordova.file.applicationStorageDirectory,options.output);
                $cordovaFile.createDir(cordova.file.applicationStorageDirectory, options.output, true)
                    .then(function (success) {
                        // success
                        $cordovaFile.createDir(firstDir, path.basename(options.input).replace('.m3u8', ''), true)
                            .then(function (success) {
                                // success

                            }, function (error) {
                                // error
                            });
                    }, function (error) {
                        // error
                    });
            }
        },
        start: function () {
            self.paused = false;
            WriteData.paused = false;
            WalkManifest(options.decrypt, self.basePath, options.input).then(function (resources) {
                return WriteData.exec(options.decrypt, options.concurrency, resources, self.finishedSegments, function (cont, totalSegments, sLabel, fname) {
                    if (self.paused == true) {
                        if (cb) cb(self.bBufer);
                        return;
                    }
                    self.bBufer.push(cont);
                    if (fname.indexOf('m3u8') == -1)
                        self.finishedSegments.push(fname);
                    var i = self.finishedSegments.length;
                    var total = (totalSegments - 1);
                    var percentage = Math.floor((i / total) * 100);
                    if (progress) progress(percentage, cont, i, total, sLabel, fname);
                }).then(function (str) {
                    if (cb) cb(self.bBufer, self.finishedSegments);
                }, function (err) {
                    if (errcb) errcb(err, self.finishedSegments);
                });
            });
        },
        pause: function () {
            self.paused = true;
            WriteData.paused = true;
        },
        destroy: function () {
            self = null;
            delete this;
        }
    }
    controller.init();
    return controller;
};
module.exports = mojDownloader;
