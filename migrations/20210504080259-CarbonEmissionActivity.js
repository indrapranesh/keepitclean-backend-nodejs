'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CarbonEmissionActivity', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        activity: {
          type: Sequelize.STRING
        },
        categoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'CarbonEmissionCategory',
            key: 'id',
          }
        },
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CarbonEmissionActivity');
  }
};