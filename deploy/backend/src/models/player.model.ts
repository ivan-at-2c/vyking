import { callQuery } from "./utils/query";

export type Player = {
  id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export const getAllPlayersQuery = async () => {
  const selectSQL = `
  SELECT * FROM Player ORDER BY createdAt DESC;
  `;

  const values: any[] = [];

  return callQuery<Player[]>(selectSQL, values, true);
};

export const getPlayerByIdQuery = async (id: string) => {
  const selectSQL = `
  SELECT * FROM Player WHERE id = ?;
  `;

  const values = [id];

  return callQuery<Player>(selectSQL, values);
};

export const getPlayerByEmailQuery = async (email: string) => {
  const selectSQL = `
    SELECT * FROM Player WHERE email = ?;
    `;

  const values = [email];

  return callQuery<Player>(selectSQL, values);
};

export const getLastInsertedPlayerQuery = async (
  name: string,
  email: string,
) => {
  const selectSQL = `
    SELECT * FROM Player WHERE name = ? AND email = ? ORDER BY createdAt DESC LIMIT 1;
    `;

  const values: any = [name, email];

  return callQuery<Player>(selectSQL, values);
};

export const rankPlayersQuery = async () => {
  const selectSQL = `
  WITH RankedPlayers AS (
    SELECT *,
           RANK() OVER (ORDER BY balance DESC) AS playerRank
    FROM Player
  )
  SELECT * FROM RankedPlayers ORDER BY playerRank ASC;
  `;

  const values: any[] = [];

  return callQuery(selectSQL, values, true);
};

export const insertPlayerQuery = async (name: string, email: string) => {
  const insertSQL = `
    INSERT INTO Player (name, email, balance, createdAt, updatedAt)
    VALUES (?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `;

  const values = [name, email];

  return callQuery<Player>(insertSQL, values);
};

export const deletePlayerByIdQuery = async (id: string) => {
  const deleteSQL = `
  DELETE FROM Player WHERE id = ?;
  `;

  const values = [id];

  return callQuery(deleteSQL, values);
};
