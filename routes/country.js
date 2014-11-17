module.exports = function Country(app) {
    var express = require('express');
    var router = express.Router();
    var Country = require('../models/country');

    router.param('country_code', function (req, res, next, country_code) {
        if (country_code) {
            req.country_code = country_code;
        }
        next();
    });

    var fetchById = function (req, res) {
        Country
            .find({ where: { Code: req.country_code } })
            .then(function (country) {
                var countries = [];
                countries[0] = country;
                this.responseCallback(this.req, this.res, countries);
            }.
                bind({req: req, res: res, responseCallback: fetchCountryResponseGenerator}))
            .catch(function (err) {
                console.log('An error occurred while searching for country for code :' + this.req.country_code, err);
            }.bind({req: req, res: res}));
    };


    var fetchAll = function (req, res) {
        Country
            .findAll()
            .then(function (countries) {
                this.responseCallback(this.req, this.res, countries);
            }
                .bind({req: req, res: res, responseCallback: fetchCountryResponseGenerator}))
            .catch(function (err) {
                console.log('An error occurred while fetching all countries', err);
            }
                .bind({req: req, res: res}));
    };


    var fetchCountryResponseGenerator = function (req, res, countries) {
        console.log('Sending JSON response');
        res.json(countries);
    };

    var updateCountryResponseGenerator = function (req, res, country) {
        console.log('Sending JSON response');
        res.json(country)
    };

    var updateCountry = function (req, res) {
        var updatedCountry = req.body;
        Country.update({
                Name: updatedCountry.Name,
                Continent: updatedCountry.Continent,
                Region: updatedCountry.Region,
                SurfaceArea: updatedCountry.SurfaceArea,
                IndepYear: updatedCountry.IndepYear,
                Population: updatedCountry.Population,
                LifeExpectancy: updatedCountry.LifeExpectancy,
                GNP: updatedCountry.GNP,
                GNPOld: updatedCountry.GNPOld,
                LocalName: updatedCountry.LocalName,
                GovernmentForm: updatedCountry.GovernmentForm,
                HeadOfState: updatedCountry.HeadOfState,
                Capital: updatedCountry.Capital,
                Code2: updatedCountry.Code2
            },
            {where: {CODE: req.country_code} })
            .then(function (rows) {
                this.responseCallback(this.req, this.res, rows);
            }.bind({req: req, res: res, responseCallback: updateCountryResponseGenerator}))
            .catch(function (err) {
                console.log('An error occurred while updating for country for code :' + this.req.country_code, err);
                this.res.json(err);
            }.bind({req: req, res: res}));
    };

    var deleteCountryResponseGenerator = function (req, res, country) {
        console.log('Sending JSON response');
        res.json(country);
    };

    var deleteCountry = function (req, res) {
        Country.destroy({ where: { CODE: req.country_code } }).then(function (affectedRows) {
            this.responseCallback(req, res, affectedRows);
        }.bind({req: req, res: res, responseCallback: deleteCountryResponseGenerator})).catch(function (err) {
            console.log('An error occurred while deleting country for code :' + this.req.country_code, err);
            this.res.json(err);
        }.bind({req: req, res: res}));
    };

    var createCountry = function (req, res) {
        var newCountry = req.body;
        console.log(req.body.Name);
        Country.
            build({
                Code: newCountry.Code,
                Name: newCountry.Name,
                Continent: newCountry.Continent,
                Region: newCountry.Region,
                SurfaceArea: newCountry.SurfaceArea,
                IndepYear: newCountry.IndepYear,
                Population: newCountry.Population,
                LifeExpectancy: newCountry.LifeExpectancy,
                GNP: newCountry.GNP,
                GNPOld: newCountry.GNPOld,
                LocalName: newCountry.LocalName,
                GovernmentForm: newCountry.GovernmentForm,
                HeadOfState: newCountry.HeadOfState,
                Capital: newCountry.Capital,
                Code2: newCountry.Code2
            })
            .save()
            .then(
            function (country) {
                this.responseCallback(this.req, this.req, country);
            }
                .bind({req: req, res: res, responseCallback: createCountryResponseGenerator}))
            .catch(
            function (err) {
                console.log(err);
                this.res.status(500);
                this.res.json(err);
            }
                .bind({req: req, res: res}));
    };

    var createCountryResponseGenerator = function (req, res, country) {
        console.log('Sending JSON response');
        res.json(country)
    };


    router.route('/:country_code')
        .get(function (req, res) {
            fetchById(req, res);
        })
        .put(function (req, res) {
            updateCountry(req, res);
        })
        .delete(function (req, res) {
            deleteCountry(req, res);
        });

    router.route('/')
        .get(function (req, res) {
            fetchAll(req, res);
        })
        .post(
        function (req, res) {
            createCountry(req, res);
        });

    return router;
}
