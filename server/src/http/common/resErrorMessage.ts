import { Response } from "express";
import * as HTTP from "@http/types";

export const resErrorMessage = (
    res: Response,
    statusCode: number,
    errorMessage: string
) => {
    const errorResponse: HTTP.Response = {
        type: "error",
        message: errorMessage,
    };
    console.error(errorMessage);
    res.status(statusCode).json(errorResponse);
};
