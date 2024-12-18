import { Response } from "express";
import * as HTTP from "@shared/http";

export const resErrorMessage = (
    res: Response,
    statusCode: number,
    errorMessage: string
) => {
    const errorResponse: HTTP.Response = {
        type: "error",
        message: errorMessage,
    };
    console.log("Error: ", errorMessage);
    res.status(statusCode).json(errorResponse);
};
