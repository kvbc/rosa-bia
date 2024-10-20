//
// useEmployee.tsx
//
// FIXME: doesnt work globally
//

import axios, { AxiosResponse } from "axios";
import { HTTP_SERVER_URL } from "../../../config";
import { useEffect } from "react";
import { HTTPRequestLogin, HTTPResponse } from "../../../server/src/types";
import { useAuthEmployeeStore } from "../stores/useAuthEmployeeStore";

export default function useAuthEmployee() {
    const { employee, jwtToken, setEmployee, setJWTToken } =
        useAuthEmployeeStore();

    useEffect(() => {
        if (employee === null && jwtToken !== null) {
            axios
                .post<HTTPResponse>(
                    HTTP_SERVER_URL + "/login",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                )
                .then((res) => res.data)
                .then((res) => {
                    if (res.responseType === "login") {
                        setEmployee(res.employee);
                    }
                });
        }
    }, [employee, jwtToken, setEmployee]);

    const login = (req: HTTPRequestLogin) => {
        axios
            .post<
                HTTPResponse,
                AxiosResponse<HTTPResponse, unknown>,
                HTTPRequestLogin
            >(HTTP_SERVER_URL + "/login", req)
            .then((res) => res.data)
            .then((res) => {
                if (res.responseType === "login") {
                    setEmployee(res.employee);
                    setJWTToken(res.jwtToken);
                }
            });
    };

    const logout = () => {
        setEmployee(null);
        setJWTToken(null);
    };

    return {
        employee,
        login,
        logout,
        jwtToken,
    };
}
