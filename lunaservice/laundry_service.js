var pkgInfo = require('./package.json');
var Service = require('webos-service');
var pmloglib = require('pmloglib');
var http = require('http');

var service = new Service(pkgInfo.name); // Create service by service name on package.json
var context = new pmloglib.Context("helloService"); // Create context of pmlog

//userID(Mcode)에 따라 사용자의 빨래 데이터를 가져오는 service 등록
service.register("getdata", function(message) {
    http.get({
        hostname: '192.168.1.122',                  //서버 ip
        port: 8080,
        path: '/userdata/'+message.payload.userID   //서버에서 작성한 MYSQL data를 가져올 경로
    }, function(res) {
        
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var fbResponse = JSON.parse(body);      //body의 내용(MYSQL data)을 JSON으로 가져오기

            message.respond({
                returnValue: true,
                message: fbResponse
            });
        });
    });
});