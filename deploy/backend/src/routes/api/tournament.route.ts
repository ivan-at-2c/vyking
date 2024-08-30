import { Router } from "express";

import { validateRequestBody } from "../../middlewares/requestValidation";
import { startTournamentSchema } from "../../shared/joi/tournament.schema";

import { tournamentController } from "./../../controllers";

export const tournamentRoute = Router();

tournamentRoute.route("/").get(tournamentController.getAllTournaments);

tournamentRoute
  .route("/start")
  .post(
    validateRequestBody(startTournamentSchema),
    tournamentController.startTournament,
  );

tournamentRoute
  .route("/complete")
  .post(tournamentController.completeTournament);

tournamentRoute.route("/bets").get(tournamentController.getAllBets);

/**
 * @swagger
 * tags:
 *   name: Tournament
 *   description: Tournament Routes
 */

/**
 * @swagger
 * /api/tournament/:
 *   get:
 *     summary: Get All Tournaments
 *     tags: [Tournament]
 *     responses:
 *       200:
 *         description: A list of tournaments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tournament'
 *       400:
 *         description: Error - Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/tournament/start:
 *   post:
 *     summary: Start a new tournament
 *     tags: [Tournament]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StartTournamentData'
 *     responses:
 *       200:
 *         description: The created tournament
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       400:
 *         description: Error - Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/tournament/complete:
 *   post:
 *     summary: Complete a tournament
 *     tags: [Tournament]
 *     responses:
 *       200:
 *         description: Tournament completed successfully
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

/**
 * @swagger
 * /api/tournament/bets:
 *   get:
 *     summary: Get all bets in tournaments
 *     tags: [Tournament]
 *     responses:
 *       200:
 *         description: A list of bets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bet'
 *       400:
 *         description: Error - Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
