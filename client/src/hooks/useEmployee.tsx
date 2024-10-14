import axios, { AxiosResponse } from "axios";
import { HTTP_SERVER_URL } from "../../../config";
import { useEffect, useState } from "react";
import { HTTPRequestLogin, HTTPResponse } from "../../../server/src/types";
import { DBRows } from "../../../server/src/dbTypes";

export default function useEmployee() {
    const ssEmployeeKey = "employee";
    const [employee, setEmployee] = useState<DBRows.Employee | null>(() => {
        const ssItem = window.sessionStorage.getItem(ssEmployeeKey);
        return ssItem ? JSON.parse(ssItem) : null;
    });
    useEffect(() => {
        if (employee === null) {
            window.sessionStorage.removeItem(ssEmployeeKey);
        } else {
            window.sessionStorage.setItem(
                ssEmployeeKey,
                JSON.stringify(employee)
            );
        }
    }, [employee]);

    const lsJWTTokenKey = "jwtToken";
    const [jwtToken, setJWTToken] = useState<string | null>(
        window.localStorage.getItem(lsJWTTokenKey)
    );
    useEffect(() => {
        if (jwtToken === null) {
            window.localStorage.removeItem(lsJWTTokenKey);
        } else {
            window.localStorage.setItem(lsJWTTokenKey, jwtToken);
        }
    }, [jwtToken]);

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
    }, [employee, jwtToken]);

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
        employeeLogin: login,
        employeeLogout: logout,
    };
}
