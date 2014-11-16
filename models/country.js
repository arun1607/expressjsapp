var sequelize = require('../dao/repository')();

var DataTypes = require("sequelize");

var Country = sequelize.define('city', {
    Code : {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Name: DataTypes.STRING,
    Continent: {
        type: DataTypes.ENUM,
        values: ['Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America']
    },
    Region: DataTypes.STRING,
    SurfaceArea: DataTypes.FLOAT(11, 12),
    IndepYear: DataTypes.INTEGER,
    Population: DataTypes.INTEGER,
    LifeExpectancy: DataTypes.FLOAT(11),
    GNP: DataTypes.FLOAT(11, 12),
    GNPOld: DataTypes.FLOAT(11, 12),
    LocalName: DataTypes.STRING,
    GovernmentForm: DataTypes.STRING,
    HeadOfState: DataTypes.STRING,
    Capital: DataTypes.INTEGER,
    Code2: DataTypes.STRING
}, {
    tableName: 'Country'
},{
    instanceMethods: {
    }
});

module.exports = Country;
