import { ApiError } from "../error/ApiError";

export const checkIDRegex = (providedId: string | string[]) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (Array.isArray(providedId)) {
    providedId.forEach((id) => {
      if (!uuidRegex.test(id)) {
        throw new ApiError("Wrong ID provided");
      }
    });

    return;
  }

  if (!uuidRegex.test(providedId as string)) {
    throw new ApiError("Wrong ID provided");
  }
};
