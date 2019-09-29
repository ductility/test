var http = require('http');
var body = '';
http.get({
    hostname: '192.168.1.122',
    port: 8080,
    path: '/userdata/ductility'
}, function(res){
    
    var body = '';
    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var fbResponse = JSON.parse(body);
        console.log("Got a response: ", fbResponse.picture);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});