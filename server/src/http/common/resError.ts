import { Response } from "express";
import { resErrorMessage } from "./resErrorMessage";

export const resError = (res: Response, statusCode: number, error: any) => {
    if (error instanceof Error) {
        resErrorMessage(res, statusCode, `[${error.name}]: ${error.message}`);
    } else {
        resErrorMessage(res, statusCode, String(error));
    }
};
