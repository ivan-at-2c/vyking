'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.context ? queryInterface = queryInterface.context : queryInterface;
    await queryInterface.createTable('Tournament', {
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
      prize: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      endDate: {
        allowNull: true,
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable('Tournament');
  }
};
