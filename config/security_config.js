module.exports = function SecurityConfig(app) {

    var basicAuth = require('basic-auth');

    var auth = function (req, res, next) {
        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.status(401).end();
        };

        var user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        };

        if (user.name === 'foo' && user.pass === 'bar') {
            return next();
        } else {
            return unauthorized(res);
        };
    };

    // will print stacktrace
    app.use('/', auth,function (req, res, next) {
        console.log('Authenticating user');
        return next();
    });

};