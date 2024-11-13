// 1

import axios, { AxiosResponse } from "axios";
import * as HTTP from "@server/http/types";
import { EmployeeLoginRequest } from "@server/http/routes/employee_login";
import * as DB from "@shared/db";
import { Filter } from "@server/http/routes/table_rows/get";

export const HTTP_SERVER_URL = "http://localhost:" + HTTP.SERVER_PORT;

/*
 *
 * Employees
 *
 */

export const apiEmployeeLogin = async (
    req?: EmployeeLoginRequest,
    jwtToken?: string
) => {
    return await axios
        .post<
            HTTP.Response,
            AxiosResponse<HTTP.Response, unknown>,
            EmployeeLoginRequest
        >(
            HTTP_SERVER_URL + "/login",
            req ?? {},
            jwtToken
                ? {
                      headers: {
                          Authorization: `Bearer ${jwtToken}`,
                      },
                  }
                : {}
        )
        .then((res) => res.data)
        .then((res) => {
            if (res.type === "login") {
                return {
                    employee: res.employee,
                    jwtToken: res.jwtToken,
                };
            }
        });
};

/*
 *
 * Table Rows
 *
 */

export const apiAddTableRow = async (
    tableName: DB.TableName,
    newRow: DB.Row
) => {
    return await axios.post(
        HTTP_SERVER_URL + "/table_rows/add/" + tableName,
        newRow
    );
};

export const apiDeleteTableRow = async (
    tableName: DB.TableName,
    rowID: number
) => {
    return await axios.post(
        HTTP_SERVER_URL + `/table_rows/delete/${tableName}/${rowID}`
    );
};

export const apiUpdateTableRow = async (
    tableName: DB.TableName,
    updatedRow: DB.Row
) => {
    return await axios.post(
        HTTP_SERVER_URL + "/table_rows/update/" + tableName,
        updatedRow
    );
};

export const apiGetTableRows = async <TRow extends DB.Row>(
    tableName: DB.TableName,
    startRowIndex: number | null = null,
    endRowIndex: number | null = null,
    filters: Filter[] = []
) => {
    let path = `/table_rows/get/${tableName}/`;
    if (startRowIndex !== null) {
        path += startRowIndex + "/" + endRowIndex!;
    }
    return await axios
        .post<HTTP.Response<TRow>>(HTTP_SERVER_URL + path, {
            filters,
        })
        .then((res) => {
            const msg = res.data;
            if (msg.type === "fetch table rows") {
                return msg;
            }
        });
};
