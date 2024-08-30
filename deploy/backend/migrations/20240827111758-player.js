'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.context ? queryInterface = queryInterface.context : queryInterface;
    await queryInterface.createTable('Player', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('(UUID())'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      balance: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  async down (queryInterface) {
    queryInterface.context ? queryInterface = queryInterface.context : queryInterface;
    await queryInterface.dropTable('Player');
  }
};
