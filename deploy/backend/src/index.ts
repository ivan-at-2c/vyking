import mysql from "mysql2/promise";

import { app } from "./app";
import { config } from "./config/config";
import { logger } from "./config/logger";

// @ts-ignore
let server: any;

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn("Server closed");
      process.exit(1);
    });
  } else {
    logger.warn("Server not started");
    process.exit(1);
  }
};

export const pool = mysql.createPool({
  host: config.database.connection_url,
  user: config.database.options.user,
  password: config.database.options.pass,
  database: config.database.database_name,
  waitForConnections: true,
  connectionLimit: 10,
  idleTimeout: 60000,
});

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

const startServer = () => {
  server = app.listen(config.server.port, () => {
    logger.info(`Server started at port: ${config.server.port}`);
  });
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
