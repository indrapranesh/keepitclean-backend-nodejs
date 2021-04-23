'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Event', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        eventType: {
            type: Sequelize.INTEGER,
            references: {
              model: 'EventType',
              key: 'id',
            }
        },
        creator: {
          type: Sequelize.INTEGER,
          references: {
            model: 'User',
            key: 'id',
          }
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        city: {
          type: Sequelize.STRING
        },
        zipcode: {
          type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        imageUrl: {
          type: Sequelize.STRING
        },
        isDeleted: {
          type: Sequelize.BOOLEAN
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
          }
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Event');
  }
};