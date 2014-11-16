module.exports = function AppConfig(app) {

    var express = require('express');

    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var port = 3000;

    app.listen(port, function(){
        console.log('The server is running, ' +
                ' please open your browser at http://localhost:%s',
            port);
    });
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.use(require('less-middleware')(path.join(__dirname,'..', 'public')));
    app.use(express.static(path.join(__dirname,'..', 'public')));

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
};