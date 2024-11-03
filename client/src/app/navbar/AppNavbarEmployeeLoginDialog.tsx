import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "../../components/ui/dialog";
import useAuthEmployee from "../../hooks/useAuthEmployee";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { Fieldset, Input } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { Button } from "../../components/ui/button";
import {
    NativeSelectField,
    NativeSelectRoot,
} from "../../components/ui/native-select";
import { Skeleton } from "../../components/ui/skeleton";

export const AppNavbarEmployeeDialog: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const employeesDBTable = useDBTable<DB.Rows.Employee>("employees");
    const { loginMutation: employeeLoginMutation } = useAuthEmployee();
    const [employeeName, setEmployeeName] = useState<string | null>(null);
    const [employeePassword, setEmployeePassword] = useState<string>("");

    useEffect(() => {
        if (employeeName === null && employeesDBTable.rows.length > 0) {
            setEmployeeName(employeesDBTable.rows[0].name);
        }
    }, [employeeName, employeesDBTable.rows]);

    const selectedEmployee = useMemo(
        () =>
            employeesDBTable.rows.find(
                (employee) => employee.name === employeeName
            ),
        [employeesDBTable.rows, employeeName]
    );

    const handleLoginButtonClicked = useCallback(() => {
        employeeLoginMutation.mutate({
            employeeName: employeeName!,
            employeePassword: selectedEmployee!.has_password
                ? employeePassword
                : "",
        });
        setIsDialogOpen(false);
    }, [
        employeeLoginMutation,
        employeeName,
        selectedEmployee,
        employeePassword,
    ]);

    return (
        <DialogRoot
            lazyMount
            // size="cover"
            open={isDialogOpen}
            placement="top"
            motionPreset="slide-in-top"
            onOpenChange={(e) => setIsDialogOpen(e.open)}
        >
            {children}
            <DialogContent>
                <DialogCloseTrigger />
                <DialogHeader>
                    <DialogTitle>Logowanie</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Fieldset.Root>
                        <Fieldset.Content>
                            <Field label="Użytkownik" required>
                                <Skeleton
                                    asChild
                                    loading={employeeName === null}
                                >
                                    <NativeSelectRoot>
                                        <NativeSelectField
                                            value={employeeName!}
                                            onChange={(e) =>
                                                setEmployeeName(
                                                    e.currentTarget.value
                                                )
                                            }
                                        >
                                            {employeesDBTable.rows.map(
                                                (employee) => (
                                                    <option
                                                        key={employee.id}
                                                        value={employee.name}
                                                    >
                                                        {employee.name}
                                                    </option>
                                                )
                                            )}
                                        </NativeSelectField>
                                    </NativeSelectRoot>
                                </Skeleton>
                            </Field>
                            {/* so browser can save */}
                            <input
                                type="username"
                                value={employeeName ?? ""}
                                hidden
                            />
                            {selectedEmployee?.has_password && (
                                <Field
                                    label="Hasło"
                                    required
                                    invalid={employeePassword.length === 0}
                                    errorText="Hasło jest wymagane"
                                >
                                    <Input
                                        type="password"
                                        placeholder="Hasło"
                                        value={employeePassword}
                                        onChange={(e) =>
                                            setEmployeePassword(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </Field>
                            )}
                        </Fieldset.Content>
                        <Button
                            type="submit"
                            bg="blue.700"
                            onClick={handleLoginButtonClicked}
                            loading={employeeName === null}
                        >
                            Zaloguj
                        </Button>
                    </Fieldset.Root>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};
