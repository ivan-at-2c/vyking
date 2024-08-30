import { RowDataPacket } from "mysql2";

import { pool } from "../../index";
import { DBError } from "../../shared/error/DBError";

import { logger } from "./../../config/logger";

export const callQuery = async <T>(
  sqlQuery: string,
  queryValues: any[],
  getAll: boolean = false,
): Promise<T> => {
  let client;
  try {
    client = await pool.getConnection();

    const [result] = await client.execute<RowDataPacket[]>(
      sqlQuery,
      queryValues,
    );

    return getAll ? (result as T) : (result[0] as T);
  } catch (error) {
    logger.error(error);
    throw new DBError(error);
  } finally {
    if (client) {
      client.release();
    }
  }
};
