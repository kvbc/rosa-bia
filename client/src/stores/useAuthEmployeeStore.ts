import { create } from "zustand";
import { DB } from "../../../server/src/db/types";

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
