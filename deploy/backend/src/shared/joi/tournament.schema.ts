import joi from "joi";

export const startTournamentSchema = joi.object({
  name: joi.string().empty("").max(100).required(),
  prize: joi.number().min(1).max(Number.MAX_SAFE_INTEGER).empty().required(),
});
