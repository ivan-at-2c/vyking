import express from "express";
import { Router } from "express-serve-static-core";

import { playerRoute } from "./player.route";
import { tournamentRoute } from "./tournament.route";

export const apiRouter = express.Router();

const defaultRoutes: { path: string; route: any }[] = [
  {
    path: "/player",
    route: playerRoute,
  },
  {
    path: "/tournament",
    route: tournamentRoute,
  },
];

const addRoutes = (router: Router, routes: any[]) => {
  routes.forEach((route) => {
    router.use(route.path, route.route);
  });
};

addRoutes(apiRouter, defaultRoutes);
