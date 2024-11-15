import { create } from "zustand";
import * as DB from "@shared/db";

//
// TODO: ideal scenario would be using HTTP-only cookies to store the jwt token
//
export const useAuthEmployeeStore = create<{
    employee: DB.Rows.Employee | null;
    jwtToken: string | null;
    setEmployee: (employee: DB.Rows.Employee | null) => void;
    setJWTToken: (jwtToken: string | null) => void;
}>((set) => {
    const lsJWTTokenKey = "jwtToken";
    return {
        employee: null,
        jwtToken: window.localStorage.getItem(lsJWTTokenKey),
        setEmployee: (employee: DB.Rows.Employee | null) => {
            set((state) => ({ ...state, employee }));
        },
        setJWTToken: (jwtToken: string | null) => {
            if (jwtToken) {
                window.localStorage.setItem(lsJWTTokenKey, jwtToken);
            } else {
                window.localStorage.removeItem(lsJWTTokenKey);
            }
            set((state) => ({ ...state, jwtToken }));
        },
    };
});
