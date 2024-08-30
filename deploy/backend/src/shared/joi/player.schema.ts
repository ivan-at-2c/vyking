import joi from "joi";

export const createPlayerSchema = joi.object({
  name: joi.string().empty("").max(100).required(),
  email: joi.string().email().empty("").required(),
});

export const joinTournamentPlayerSchema = joi.object({
  tournamentId: joi.string().empty("").required(),
  bet: joi.number().empty().min(1).max(Number.MAX_SAFE_INTEGER).required(),
});
