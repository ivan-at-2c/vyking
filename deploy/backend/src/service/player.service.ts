import httpStatus from "http-status";

import {
  deletePlayerByIdQuery,
  getAllPlayersQuery,
  getLastInsertedPlayerQuery,
  getPlayerByEmailQuery,
  getPlayerByIdQuery,
  insertPlayerQuery,
  rankPlayersQuery,
} from "../models/player.model";
import { getTournamentByIdQuery } from "../models/tournament.model";
import {
  getPlayerTournamentByPlayerAndTournamentIdQuery,
  joinPlayerTournamentQuery,
} from "../models/tournamentUser.model";
import { ApiError } from "../shared/error/ApiError";

export const createPlayer = async (name: string, email: string) => {
  const existingPlayer = await getPlayerByEmailQuery(email);

  if (existingPlayer) {
    throw new ApiError("Player already exists.");
  }

  await insertPlayerQuery(name, email);

  return getLastInsertedPlayerQuery(name, email);
};

export const getAllPlayers = async () => {
  return getAllPlayersQuery();
};

export const getPlayer = async (id: string) => {
  return getPlayerByIdQuery(id);
};

export const getPlayerRankings = async () => rankPlayersQuery();

export const joinTournament = async (
  id: string,
  tournamentId: string,
  bet: number,
) => {
  const existingPlayer = await getPlayerByIdQuery(id);

  if (!existingPlayer) {
    throw new ApiError("Player not found.", httpStatus.NOT_FOUND);
  }

  const existingTournament = await getTournamentByIdQuery(tournamentId);

  if (!existingTournament) {
    throw new ApiError("Tournament not found.", httpStatus.NOT_FOUND);
  }

  if (existingTournament.endDate) {
    throw new ApiError("Tournament ended.");
  }

  const alreadyJoinedTournament =
    await getPlayerTournamentByPlayerAndTournamentIdQuery(id, tournamentId);

  if (alreadyJoinedTournament) {
    throw new ApiError("Player already joined the tournament");
  }

  return joinPlayerTournamentQuery(id, tournamentId, bet);
};

export const deletePlayer = async (id: string) => {
  const player = await getPlayerByIdQuery(id);

  if (!player) {
    throw new ApiError("Player not found.", httpStatus.NOT_FOUND);
  }

  return deletePlayerByIdQuery(id);
};
