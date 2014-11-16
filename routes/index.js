module.exports = function (app) {

    var city = require('./city')(app);

    var country = require('./country')(app);

    app.use('/city', city);
    app.use('/country', country);

    app.use('/', function (req, res) {
        console.log("Req param are :" + req.params);
        res.render('index', {title: 'Express'});
    });
};
