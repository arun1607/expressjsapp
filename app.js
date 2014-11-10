var express = require('express');

var http = require('http');
var path = require('path');

var Routes = require('./routes');
var AppConfig = require('./config/app_config');
var SecurityConfig = require('./config/security_config');

var app = express();

new Routes(app);
new AppConfig(app);
new SecurityConfig(app);

app.use(require('less-middleware')(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public')));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;

