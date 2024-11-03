//
// useEmployee.tsx
//

import { useCallback } from "react";
import { useAuthEmployeeStore } from "../stores/useAuthEmployeeStore";
import { apiEmployeeLogin } from "../api/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useAuthEmployee() {
    const queryClient = useQueryClient();
    const { employee, jwtToken, setEmployee, setJWTToken } =
        useAuthEmployeeStore();

    const query = useQuery({
        queryKey: ["employee", employee, jwtToken],
        queryFn: async () => {
            if (employee === null && jwtToken !== null) {
                const data = await apiEmployeeLogin(undefined, jwtToken!);
                if (data) {
                    setEmployee(data.employee);
                }
                return data;
            }
            return {
                employee,
                jwtToken,
            };
        },
    });

    const loginMutation = useMutation({
        mutationFn: apiEmployeeLogin,
        onSuccess: (data) => {
            if (data) {
                setEmployee(data.employee);
                setJWTToken(data.jwtToken);
                queryClient.invalidateQueries({
                    queryKey: ["employee", data.employee, data.jwtToken],
                });
            }
        },
    });

    const logout = useCallback(() => {
        setEmployee(null);
        setJWTToken(null);
    }, [setEmployee, setJWTToken]);

    return {
        query,
        logout,
        loginMutation,
    };
}
