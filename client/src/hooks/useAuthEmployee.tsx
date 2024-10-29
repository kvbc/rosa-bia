//
// useEmployee.tsx
//
// FIXME: doesnt work globally
//

import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useAuthEmployeeStore } from "../stores/useAuthEmployeeStore";
import { HTTP } from "../../../server/src/http/types";
import { HTTP_SERVER_URL } from "../api/http";
import { EmployeeLoginRequest } from "../../../server/src/http/routes/employee_login";

export default function useAuthEmployee() {
    const { employee, jwtToken, setEmployee, setJWTToken } =
        useAuthEmployeeStore();

    useEffect(() => {
        if (employee === null && jwtToken !== null) {
            axios
                .post<HTTP.Response>(
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
                    if (res.type === "login") {
                        setEmployee(res.employee);
                    }
                });
        }
    }, [employee, jwtToken, setEmployee]);

    const login = (req: EmployeeLoginRequest) => {
        axios
            .post<
                HTTP.Response,
                AxiosResponse<HTTP.Response, unknown>,
                EmployeeLoginRequest
            >(HTTP_SERVER_URL + "/login", req)
            .then((res) => res.data)
            .then((res) => {
                if (res.type === "login") {
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
