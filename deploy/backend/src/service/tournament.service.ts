import httpStatus from "http-status";

import {
  completeTournamentQuery,
  distributePrizesQuery,
  getAllTournamentsQuery,
  getLastInsertedTournamentQuery,
  getTournamentByIdQuery,
  insertTournamentQuery,
} from "../models/tournament.model";
import {
  getPlayerTournamentByTournamentIdQuery,
  getPlayerTournamentQuery,
} from "../models/tournamentUser.model";
import { ApiError } from "../shared/error/ApiError";

export const createTournament = async (name: string, prize: number) => {
  await insertTournamentQuery(name, prize);
  return getLastInsertedTournamentQuery(name, prize);
};

export const completeTournament = async (id: string) => {
  const existingTournament = await getTournamentByIdQuery(id);

  if (!existingTournament) {
    throw new ApiError("Tournament not found.", httpStatus.NOT_FOUND);
  }

  if (existingTournament.endDate) {
    throw new ApiError("Tournament already finished.");
  }

  const playersInTournament = await getPlayerTournamentByTournamentIdQuery(id);

  if (
    !playersInTournament ||
    !Array.isArray(playersInTournament) ||
    (Array.isArray(playersInTournament) && playersInTournament.length < 3)
  ) {
    throw new ApiError("Not enough players to close the tournament.");
  }

  await distributePrizesQuery(id);

  return completeTournamentQuery(id);
};

export const getAllTournaments = async () => getAllTournamentsQuery();

export const getAllBets = async () => getPlayerTournamentQuery();
