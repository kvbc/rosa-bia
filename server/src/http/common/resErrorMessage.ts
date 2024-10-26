import { Response } from "express";
import { HTTP } from "..";

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
