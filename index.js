 var forever = require('forever-monitor');

module.exports = function(port, dataDir) {
  var child = new (forever.Monitor)('cloud9.sh', {
    command: '/bin/bash',
    options: [
            '-w', dataDir,
            '-p', port,
        ],
    sourceDir: __dirname + '/lib/bin/',
    max: 3,
    silent: false,
    options: []
  });

  child.on('exit', function (e) {
    console.log('IDE has exited after 3 restarts');
  });
  process.on('exit', function(){
    child.exit();
  })
  child.start();
};

if (!module.parent){
  module.exports({IDE:3131});
}