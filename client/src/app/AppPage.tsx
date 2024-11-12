import React, { PropsWithChildren } from "react";
import useAuthEmployee from "../hooks/useAuthEmployee";
import { EmptyState } from "../components/ui/empty-state";
import { LuAlertTriangle, LuEyeOff, LuLock } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function AppPage({
    children,
    isAdminOnly,
    dontRequireLogin,
}: PropsWithChildren<{ isAdminOnly?: boolean; dontRequireLogin?: boolean }>) {
    dontRequireLogin = dontRequireLogin ?? false;

    const authEmployee = useAuthEmployee();
    const navigate = useNavigate();

    // console.log(authEmployee.query.fetchStatus);

    // if (authEmployee.query.isFetching) {
    //     return (
    //         <EmptyState
    //             icon={<Spinner />}
    //             title="Ładowanie podstrony"
    //             description="Proszę czekać..."
    //         />
    //     );
    // }

    if (authEmployee.query.isSuccess) {
        if (!authEmployee.query.data?.employee && !dontRequireLogin) {
            return (
                <EmptyState
                    icon={<LuEyeOff />}
                    title="Wymagane logowanie"
                    description="Ta podstrona wymaga uprawnień użytkownika"
                />
            );
        }
        if (
            isAdminOnly &&
            Boolean(authEmployee.query.data?.employee?.admin) == false
        ) {
            navigate("/");
            return (
                <EmptyState
                    icon={<LuLock />}
                    title="Brak dostępu"
                    description="Ta podstrona jest niedostępna dla zwykłych użytkowników, przekierowywanie..."
                />
            );
        }
    }

    if (authEmployee.query.isError) {
        return (
            <EmptyState
                icon={<LuAlertTriangle />}
                title="Bład logowania"
                description="Wystąpił błąd podczas próby logowania"
            />
        );
    }

    return children;
}
