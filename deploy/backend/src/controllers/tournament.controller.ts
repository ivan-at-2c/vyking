import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../shared/utils/CatchAsync";
import { checkIDRegex } from "../shared/utils/string";

import { tournamentService } from "./../service";

export const startTournament = catchAsync(
  async (req: Request, res: Response) => {
    const { name, prize } = req.body;

    const createdTournament = await tournamentService.createTournament(
      name,
      prize,
    );

    res.status(httpStatus.OK).send({
      success: true,
      content: createdTournament,
    });
  },
);

export const completeTournament = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.body;

    checkIDRegex(id);

    await tournamentService.completeTournament(id);

    res.status(httpStatus.OK).send({
      success: true,
      message: "Tournament completed successfully.",
    });
  },
);

export const getAllTournaments = catchAsync(
  async (_req: Request, res: Response) => {
    const allTournaments = await tournamentService.getAllTournaments();

    res.status(httpStatus.OK).send({
      success: true,
      content: allTournaments,
    });
  },
);

export const getAllBets = catchAsync(async (_req: Request, res: Response) => {
  const allBets = await tournamentService.getAllBets();

  res.status(httpStatus.OK).send({
    success: true,
    content: allBets,
  });
});
