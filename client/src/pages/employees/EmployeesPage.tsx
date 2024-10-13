import { DB } from "../../../../server/src/dbTypes";
import DBTableEdit from "../../components/DBTableEdit";
import useDBEntriesStore from "../../hooks/useDBTableStore";

export default function EmployeesPage() {
    const employeeDBEntries = useDBEntriesStore<DB.Employee>('employees')(); // prettier-ignore

    return (
        <DBTableEdit
            dbEntries={employeeDBEntries}
            headers={["Nazwa", "Hasło", "Administrator"]}
            emptyEntry={{
                id: employeeDBEntries.totalRowCount + 1,
                name: "",
                password: "",
                admin: false,
            }}
            rowInputsProps={[
                {
                    type: "text",
                    entryKey: "name",
                },
                {
                    type: "text",
                    entryKey: "password",
                },
                {
                    type: "checkbox",
                    entryKey: "admin",
                },
            ]}
        />
    );
}
