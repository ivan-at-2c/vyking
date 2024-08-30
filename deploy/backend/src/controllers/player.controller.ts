import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../shared/utils/CatchAsync";
import { checkIDRegex } from "../shared/utils/string";

import { playerService } from "./../service";

export const createPlayer = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const createdPlayer = await playerService.createPlayer(name, email);

  res.status(httpStatus.CREATED).send({
    success: true,
    content: createdPlayer,
  });
});

export const getAllPlayers = catchAsync(
  async (_req: Request, res: Response) => {
    const allPlayers = await playerService.getAllPlayers();

    res.status(httpStatus.OK).send({
      success: true,
      content: allPlayers,
    });
  },
);

export const getPlayer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  checkIDRegex(id);

  const player = await playerService.getPlayer(id);

  if (!player) {
    res.status(httpStatus.OK).send({
      success: false,
      message: "There is no player with that ID.",
    });
    return;
  }

  console.log(player);

  res.status(httpStatus.OK).send({
    success: true,
    content: player,
  });
});

export const getPlayerRankings = catchAsync(
  async (_req: Request, res: Response) => {
    const playerRankings = await playerService.getPlayerRankings();

    res.status(httpStatus.OK).send({
      success: true,
      content: playerRankings,
    });
  },
);

export const joinTournament = catchAsync(
  async (req: Request, res: Response) => {

      console.log("Usao u joinTournament")

    const { id } = req.params;

    checkIDRegex(id);

    const { tournamentId, bet } = req.body;

    checkIDRegex(tournamentId);

    await playerService.joinTournament(id, tournamentId, bet);

    res.status(httpStatus.OK).send({
      success: true,
      message: "Successfully joined tournament",
    });
  },
);

export const deletePlayer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  checkIDRegex(id);

  await playerService.deletePlayer(id);

  res.status(httpStatus.OK).send({
    success: true,
    content: id,
  });
});
