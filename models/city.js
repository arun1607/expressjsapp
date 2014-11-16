var sequelize = require('../dao/repository')();

var DataTypes = require("sequelize");

var City = sequelize.define('city', {
    ID: {type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: DataTypes.STRING,
    CountryCode: DataTypes.STRING,
    District: DataTypes.STRING,
    Population: DataTypes.BIGINT
}, {
    tableName: 'city'
},{
    instanceMethods: {
    }
});

module.exports = City;
