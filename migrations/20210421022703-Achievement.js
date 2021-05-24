'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Achievement', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        hostedCount: {
          type: Sequelize.INTEGER
        },
        participatedCount: {
          type: Sequelize.INTEGER
        },
        logoUrl: {
          type: Sequelize.STRING
        }
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Achievement');
  }
};