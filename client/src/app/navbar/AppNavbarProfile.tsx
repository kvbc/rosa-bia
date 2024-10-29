import {
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalDialog,
    Option,
    Select,
    Stack,
} from "@mui/joy";
import React, { useCallback, useState } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import useAuthEmployee from "../../hooks/useAuthEmployee";
import LogoutIcon from "@mui/icons-material/Logout";

export const AppNavbarProfile: React.FC = () => {
    const employeesDBTable = useDBTable<DB.Rows.Employee>("employees");
    const {
        employee,
        login: employeeLogin,
        logout: employeeLogout,
    } = useAuthEmployee();

    const [modalEmployee, setModalEmployee] = useState<DB.Rows.Employee | null>(
        null
    );

    const handleEmployeeLogin = useCallback(
        (employee: DB.Rows.Employee) => {
            if (employee.has_password) {
                setModalEmployee(employee);
            } else {
                employeeLogin({
                    employeeName: employee.name,
                    employeePassword: "",
                });
            }
        },
        [employeeLogin]
    );

    const handleEmployeeModalClosed = useCallback(() => {
        if (modalEmployee === null) {
            return;
        }
        employeeLogin({
            employeeName: modalEmployee.name,
            employeePassword: modalEmployee?.password,
        });
        setModalEmployee(null);
    }, [employeeLogin, modalEmployee]);

    return (
        <Stack direction="row">
            <Select
                size="sm"
                variant="solid"
                color="primary"
                // value={employeeName ?? null}
                value={employee?.name}
                placeholder="Pracownik"
                onChange={(_, value) =>
                    handleEmployeeLogin(
                        employeesDBTable.rows.find(
                            (employee) => employee.name === value
                        )!
                    )
                }
            >
                {employeesDBTable.rows.map((employee) => (
                    <Option
                        variant="soft"
                        key={employee.id}
                        value={employee.name}
                        color={employee.admin ? "danger" : "primary"}
                    >
                        {employee.name}
                    </Option>
                ))}
            </Select>
            {employee && (
                <IconButton
                    onClick={employeeLogout}
                    size="sm"
                    variant="solid"
                    color="danger"
                >
                    <LogoutIcon fontSize="inherit" />
                </IconButton>
            )}
            <Modal
                open={modalEmployee !== null}
                onClose={handleEmployeeModalClosed}
            >
                <ModalDialog>
                    <DialogTitle>Logowanie</DialogTitle>
                    <DialogContent>
                        Konto użytkownika &quot;{modalEmployee?.name}&quot;
                        wymaga hasła
                    </DialogContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEmployeeModalClosed();
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Hasło</FormLabel>
                                {/* just to prompt the save with correct username */}
                                <Input
                                    type="username"
                                    className="hidden"
                                    value={modalEmployee?.name}
                                />
                                <Input
                                    type="password"
                                    autoFocus
                                    required
                                    value={modalEmployee?.password}
                                    onChange={(e) =>
                                        setModalEmployee(
                                            (modalEmployee) =>
                                                modalEmployee && {
                                                    ...modalEmployee,
                                                    password: e.target.value,
                                                }
                                        )
                                    }
                                />
                            </FormControl>
                            <Button type="submit">Zaloguj</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </Stack>
    );
};
