import { callQuery } from "./utils/query";

export type Tournament = {
  id: string;
  name: string;
  prize: number;
  startDate: number;
  endDate: number;
  createdAt: number;
  updatedAt: number;
};

export const insertTournamentQuery = async (name: string, prize: number) => {
  const insertSQL = `
    INSERT INTO Tournament (name, prize, startDate, createdAt, updatedAt)
    VALUES (?, ? * 100, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `;

  const values = [name, prize, Date.now() / 1000];

  return callQuery<Tournament>(insertSQL, values);
};

export const completeTournamentQuery = async (id: string) => {
  const updateSQL = `
    UPDATE Tournament
    SET endDate = UNIX_TIMESTAMP(), updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?;
  `;

  const values = [id];

  return callQuery<Tournament>(updateSQL, values);
};

export const distributePrizesQuery = async (id: string) => {
  const functionSQL = `CALL distribute_prizes(?)`;

  const values = [id];

  return callQuery(functionSQL, values);
};

export const getTournamentByIdQuery = async (id: string) => {
  const selectSQL = `
    SELECT * FROM Tournament WHERE id = ?;
    `;

  const values = [id];

  return callQuery<Tournament>(selectSQL, values);
};

export const getLastInsertedTournamentQuery = async (
  name: string,
  prize: number,
) => {
  const selectSQL = `
    SELECT * FROM Tournament WHERE name = ? AND prize = ? * 100 ORDER BY createdAt DESC LIMIT 1;
    `;

  const values: any[] = [name, prize];

  return callQuery<Tournament>(selectSQL, values);
};

export const getAllTournamentsQuery = async () => {
  const selectSQL = `
    SELECT * FROM Tournament ORDER BY createdAt DESC;
    `;

  const values: any[] = [];

  return callQuery<Tournament[]>(selectSQL, values, true);
};
