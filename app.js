var express = require('express');

var Routes = require('./routes');
var AppConfig = require('./config/app_config');
var SecurityConfig = require('./config/security_config');
var configurations = require('/conf/keys.json');

var app = express();
app.set('configurations', configurations);
new AppConfig(app);
new SecurityConfig(app);
new Routes(app);

