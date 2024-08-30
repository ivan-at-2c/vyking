'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE distribute_prizes(IN tId CHAR(36))
      BEGIN
          DECLARE totalPrize INTEGER;
          DECLARE firstPlacePrize INTEGER;
          DECLARE secondPlacePrize INTEGER;
          DECLARE thirdPlacePrize INTEGER;
      
          -- Get the total prize pool for the tournament
          SELECT prize INTO totalPrize
          FROM Tournament
          WHERE id = tId;
      
          -- Calculate the prize distribution
          SET firstPlacePrize = totalPrize * 0.50;
          SET secondPlacePrize = totalPrize * 0.30;
          SET thirdPlacePrize = totalPrize * 0.20;
      
          -- Update the Player balances based on playerRank
          UPDATE Player p
          JOIN (
              SELECT playerId, 
                     RANK() OVER (ORDER BY bet DESC, joinedAt ASC) AS playerRank
              FROM TournamentPlayer
              WHERE tournamentId = tId
          ) AS rankedPlayers ON p.id = rankedPlayers.playerId
          SET p.balance = CASE 
              WHEN rankedPlayers.playerRank = 1 THEN p.balance + firstPlacePrize
              WHEN rankedPlayers.playerRank = 2 THEN p.balance + secondPlacePrize
              WHEN rankedPlayers.playerRank = 3 THEN p.balance + thirdPlacePrize
              ELSE p.balance
          END
          WHERE rankedPlayers.playerRank <= 3;
      
          -- Update the place column in TournamentPlayer table
          UPDATE TournamentPlayer tp
          JOIN (
              SELECT playerId, 
                     RANK() OVER (ORDER BY bet DESC, joinedAt ASC) AS playerRank
              FROM TournamentPlayer
              WHERE tournamentId = tId
          ) AS rankedPlayers ON tp.playerId = rankedPlayers.playerId
          SET tp.place = rankedPlayers.playerRank;
      
      END;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS distribute_prizes;`);
  }
};
