'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.context ? queryInterface = queryInterface.context : queryInterface;
    await queryInterface.createTable('TournamentPlayer', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('(UUID())'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      tournamentId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Tournament",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      playerId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Player",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      place: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      bet: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      joinedAt: {
        allowNull: false,
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
    await queryInterface.dropTable('TournamentPlayer');
  }
};
