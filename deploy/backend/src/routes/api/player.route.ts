import { Router } from "express";

import { validateRequestBody } from "../../middlewares/requestValidation";
import {
  createPlayerSchema,
  joinTournamentPlayerSchema,
} from "../../shared/joi/player.schema";

import { playerController } from "./../../controllers";

export const playerRoute = Router();

playerRoute
  .route("/")
  .get(playerController.getAllPlayers)
  .post(validateRequestBody(createPlayerSchema), playerController.createPlayer);

playerRoute.route("/ranking").get(playerController.getPlayerRankings);

playerRoute
  .route("/:id")
  .get(playerController.getPlayer)
  .delete(playerController.deletePlayer);

playerRoute
  .route("/:id/join-tournament")
  .post(
    validateRequestBody(joinTournamentPlayerSchema),
    playerController.joinTournament,
  );

/**
 * @swagger
 * tags:
 *   name: Player
 *   description: Player Routes
 */

/**
 * @swagger
 * /api/player/:
 *   get:
 *     summary: Get All Players
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       400:
 *         description: Error - Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Create a new player
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlayerData'
 *     responses:
 *       200:
 *         description: The created player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Error - Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/player/ranking:
 *   get:
 *     summary: Get player rankings
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: A list of players ranked by balance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlayerRanking'
 *       400:
 *         description: Error - Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/player/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The player ID
 *     responses:
 *       200:
 *         description: The player data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a player by ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The player ID
 *     responses:
 *       200:
 *         description: The deleted player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/player/{id}/join-tournament:
 *   post:
 *     summary: Join a player to a tournament
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The player ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerJoinTournamentData'
 *     responses:
 *       200:
 *         description: The player's tournament join confirmation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Error - Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
