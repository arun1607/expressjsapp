var express = require('express');

var Routes = require('./routes');
var AppConfig = require('./config/app_config');

var app = express();
new AppConfig(app);
new Routes(app);

