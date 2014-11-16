module.exports = function City(app) {
    var express = require('express');
    var router = express.Router();
    var City = require('../models/city');

    router.param('city_id', function (req, res, next, city_id) {
        if (city_id) {
            req.city_id = city_id;
        }
        next();
    });

    var fetchById = function (req, res) {
        City
            .find({ where: { ID: req.city_id } })
            .then(function (city) {
                var cities = [];
                cities[0] = city;
                this.responseCallback(this.req, this.res, cities);
            }.
                bind({req: req, res: res, responseCallback: fetchCityResponseGenerator}))
            .catch(function (err) {
                console.log('An error occurred while searching for city for id :' + this.req.city_id, err);
            }.bind({req: req, res: res}));
    };


    var fetchAll = function (req, res) {
        City
            .findAll()
            .then(function (cities) {
                this.responseCallback(this.req, this.res, cities);
            }
                .bind({req: req, res: res, responseCallback: fetchCityResponseGenerator}))
            .catch(function (err) {
                console.log('An error occurred while fetching all cities', err);
            }
                .bind({req: req, res: res}));
    }


    var fetchCityResponseGenerator = function (req, res, cities) {
        console.log('Sending JSON response');
        res.json(cities);
    };

    var updateCityResponseGenerator = function (req, res, city) {
        console.log('Sending JSON response');
        res.json(city)
    };

    var updateCity = function (req, res) {
        var updatedCity = req.body;
        City.update({  Name: updatedCity.Name,
            CountryCode: updatedCity.CountryCode,
            District: updatedCity.District,
            Population: updatedCity.Population}, {where: {ID: req.city_id} })
            .then(function (rows) {
                this.responseCallback(this.req, this.res, rows);
            }.bind({req: req, res: res, responseCallback: updateCityResponseGenerator}))
            .catch(function (err) {
                console.log('An error occurred while updating for city for id :' + this.req.city_id, err);
                this.res.json(err);
            }.bind({req: req, res: res}));
    };

    var deleteCityResponseGenerator = function (req, res, city) {
        console.log('Sending JSON response');
        res.json(city)
    };

    var deleteCity = function (req, res) {
        City.destroy({ where: { ID: req.city_id } }).then(function (affectedRows) {
            this.responseCallback(req, res, affectedRows);
        }.bind({req: req, res: res, responseCallback: deleteCityResponseGenerator})).catch(function (err) {
            console.log('An error occurred while deleting city for id :' + this.req.city_id, err);
            this.res.json(err);
        }.bind({req: req, res: res}));
    };

    var createCity = function (req, res) {
        var newCity = req.body;
        console.log(req.body.Name);
        City.
            build({
                Name: newCity.Name,
                CountryCode: newCity.CountryCode,
                District: newCity.District,
                Population: newCity.Population
            })
            .save()
            .then(
            function (city) {
                this.responseCallback(this.req, this.req, city);
            }
                .bind({req: req, res: res, responseCallback: createCityResponseGenerator}))
            .catch(
            function (err) {
                console.log(err);
                this.res.status(500);
                this.res.json(err);
            }
                .bind({req: req, res: res}));
    };

    var createCityResponseGenerator = function (req, res, city) {
        console.log('Sending JSON response');
        res.json(city)
    };


    router.route('/:city_id')
        .get(function (req, res) {
            fetchById(req, res);
        })
        .put(function (req, res) {
            updateCity(req, res);
        })
        .delete(function (req, res) {
            deleteCity(req, res);
        });

    router.route('/')
        .get(function (req, res) {
            fetchAll(req, res);
        })
        .post(
        function (req, res) {
            createCity(req, res);
        });

    return router;
}
