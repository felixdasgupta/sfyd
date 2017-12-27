var static = require('node-static');
var file = new static.Server();
require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response);
    console.log("Go to localhost:3000");
  }).resume();
}).listen(process.env.PORT || 3000);