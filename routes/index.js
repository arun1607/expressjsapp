
module.exports = function(app) {

    var users = require('./users');

    app.use('/users', users);



    app.use('/',function (req, res, next) {
        console.log('%s %s — %s', (new Date).toString(), req.method, req.url);
        return next();
    });

    app.use('/', function (req, res) {
        res.render('index', {title: 'Express'});
    });

};
