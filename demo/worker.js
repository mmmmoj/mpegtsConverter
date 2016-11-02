importScripts(
    'shim/console.worker.js',
    'shim/console.time.js',
    '../dist/blobconverter.js'
);

addEventListener('message', function (event) {
    var d = event.data;
    var index = d.index;
    if (d.type === 'convert') {
        // async.eachSeries(d.src, function (ab, callback) {
            var blob = new Blob([d.src]);
            var url = URL.createObjectURL(blob);
        blobConverter(url,function(link){
                console.log('finished convert #' + index)
                console.timeEnd('convert');
                postMessage({type: 'segment', seg: index, url: link});
            },function(err){
                console.log(err);
                console.log('Error convert #' + index)
                console.timeEnd('convert');
                postMessage({type: 'error', seg: index});
            });
        // });
    }
});
