'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CarbonEmissionFactor', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        baseUnit: {
          type: Sequelize.STRING
        },
        emissionPerUnit: {
          type: Sequelize.FLOAT
        },
        emissionUnit: {
          type: Sequelize.STRING
        },
        activityId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'CarbonEmissionActivity',
            key: 'id',
          }
        },
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CarbonEmissionFactor');
  }
};