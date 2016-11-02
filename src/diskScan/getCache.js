/**
 * Created by mojahed on 16-10-26.
 */
var path = require('path');
var m3u8 = require('m3u8-parser');

var getCache = (function () {
    try {
        var tasks = [],tasksInfo = [],uncompletedTasks = [],completedTasks = [];
        var userId,videosPath;

        function setVideoPath() {
            videosPath =  path.join(cordova.file.applicationStorageDirectory, userId);
        }

        function setUserId(u) {
            userId = u;
            setVideoPath();
            getTasks();
        }

        function getTasks() {
            listDir(videosPath,function (entry) {
                tasks.push(entry);
                getTaskInfo(entry);
                getUncompleted();
            },function (err) {
                console.log(err);
            });
        }

        function getTaskInfo(task) {
            var p = path.join(videosPath,task);
            var obj = {};
            obj.folder = task;
            obj.finishedSegments = [];
            listDir(p,function (entry) {
                if(entry.indexOf('.m3u8') > -1){
                    var u = path.join(p,entry);
                    getFile(u,'text',function (txt) {
                        var mf = parseManifest(txt);
                        obj.total = mf.segments.length;
                    });
                }
                else if(entry.indexOf('.ts') > -1){
                    obj.finishedSegments.push(entry);
                }
            },function (err) {
                console.log(err);
            });
            obj.completed = (obj.finishedSegments.length == obj.total?true:false);
            obj.percentage = Math.floor((obj.finishedSegments.length / obj.total) * 100);
            tasksInfo.push(obj);
        }

        function getUncompleted() {
            tasksInfo = tasksInfo || [];
            tasksInfo.forEach(function (task) {
               if(task.completed == false){
                   uncompletedTasks.push(task.folder);
               }
               else if(task.completed == true){
                   completedTasks.push(task.folder);
               }
            });
        }

        function listDir(p,cb,errcb) {
            window.resolveLocalFileSystemURL(p,
                function (fileSystem) {
                    var reader = fileSystem.createReader();
                    reader.readEntries(
                        function (entry) {
                            cb(entry);
                        },
                        function (err) {
                            errcb(err);
                        }
                    );
                }, function (err) {
                    errcb(err);
                }
            );
        }

        function parseManifest(content) {
            var parser = new m3u8.Parser();
            parser.push(content);
            parser.end();
            return parser.manifest;
        }

        function getFile(url,type, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = type;
            xhr.onload = function() {
                var file = xhr.response;
                if (callback)
                    callback(file);
            }
            xhr.send();
        }

        function startDownload(opt) {

        }

        return {
            init:setUserId,
            getTasks: function () {
                return tasks;
            },
            getTasksInfo: function () {
                return tasksInfo;
            },
            refreshTask: getTasks,
            getUnComplete : function () {
                return uncompletedTasks;
            }
        }
    } catch (err) {
        console.log(err);
    }
})();
module.exports = getCache;