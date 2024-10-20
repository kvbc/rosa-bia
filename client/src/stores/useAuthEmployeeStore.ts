import { create } from "zustand";
import { DBRows } from "../../../server/src/dbTypes";

export const useAuthEmployeeStore = create<{
    employee: DBRows.Employee | null;
    jwtToken: string | null;
    setEmployee: (employee: DBRows.Employee | null) => void;
    setJWTToken: (jwtToken: string | null) => void;
}>((set) => {
    const lsJWTTokenKey = "jwtToken";
    return {
        employee: null,
        jwtToken: window.localStorage.getItem(lsJWTTokenKey),
        setEmployee: (employee: DBRows.Employee | null) => {
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
