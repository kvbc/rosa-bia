import { PropsWithChildren, useEffect } from "react";
import useAuthEmployee from "../hooks/useAuthEmployee";
import axios from "axios";
import { HTTP } from "../../../server/src/http/types";
import { AppError } from "./App";

export const AppEmployee: React.FC<
    PropsWithChildren<{
        addError: (error: AppError) => void;
    }>
> = ({ addError, children }) => {
    const authEmployee = useAuthEmployee();

    useEffect(() => {
        const data = authEmployee.query.data;
        if (data) {
            const id = axios.interceptors.request.use((req) => {
                req.headers.Authorization = `Bearer ${data.jwtToken}`;
                return req;
            });
            return () => {
                axios.interceptors.request.eject(id);
            };
        }
    }, [authEmployee.query.data]);

    useEffect(() => {
        axios.interceptors.response.use(null, (error) => {
            const req: XMLHttpRequest = error.request;
            const res: HTTP.Response = error.response.data;
            if (res.type === "error") {
                addError({
                    brief: error.message,
                    url: req.responseURL,
                    details: res.message,
                });
                return Promise.reject(error);
            }
        });
    }, [addError]);

    return children;
};
