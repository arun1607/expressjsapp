module.exports = function RepositoryConfig() {
    var configurations = require('../config/keys.json');
    var Sequelize = require('sequelize');

    var sequelize = new Sequelize(
        configurations.db.database,
        configurations.db.username,
        configurations.db.password,
        {
            dialect: configurations.db.driver,
            logging: console.log,
            define: {
                underscored: true,
                freezeTableName: true,
                syncOnAssociation: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                classMethods: {method1: function() {}},
                instanceMethods: {method2: function() {}},
                timestamps: false
            },
            host     : configurations.db.host,
            port     : configurations.db.port
        }
    );
    sequelize
        .authenticate()
        .complete(function(err) {
            if (!!err) {
                console.log('Unable to connect to the database:', err)
            } else {
                console.log('Connection has been established successfully.')
            }
        })
    return sequelize;
}
