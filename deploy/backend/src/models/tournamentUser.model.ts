import { callQuery } from "./utils/query";

export const joinPlayerTournamentQuery = async (
  playerId: string,
  tournamentId: string,
  bet: number,
) => {
  const insertSQL = `
    INSERT INTO TournamentPlayer (playerId, tournamentId, bet, joinedAt, createdAt, updatedAt)
    VALUES (?, ?, ? * 100, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `;

  const values = [playerId, tournamentId, bet, Date.now() / 1000];

  return callQuery(insertSQL, values);
};

export const getPlayerTournamentByPlayerAndTournamentIdQuery = async (
  playerId: string,
  tournamentId: string,
) => {
  const selectSQL = `
    SELECT * FROM TournamentPlayer WHERE playerId = ? AND tournamentId = ?;
    `;

  const values = [playerId, tournamentId];

  return callQuery(selectSQL, values);
};

export const getPlayerTournamentQuery = async () => {
  const selectSQL = `
    SELECT * FROM TournamentPlayer;
    `;

  const values: any[] = [];

  return callQuery(selectSQL, values, true);
};

export const getPlayerTournamentByTournamentIdQuery = async (
  tournamentId: string,
) => {
  const selectSQL = `
    SELECT * FROM TournamentPlayer WHERE tournamentId = ?;
    `;

  const values: any[] = [tournamentId];

  return callQuery(selectSQL, values, true);
};
