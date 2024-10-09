import DBTableEdit from "../../components/DBTableEdit";
import { MyInputSelectOption } from "../../components/MyInput";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Box from "@mui/joy/Box";
import { FaGear, FaHouse } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { MdVilla } from "react-icons/md";
import { IoIosConstruct } from "react-icons/io";
import { LuConstruction } from "react-icons/lu";
import { GrPlan } from "react-icons/gr";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaDatabase } from "react-icons/fa6";
import ConstructionSectionTableEditRowContent from "./ConstructionSectionTableEditRowContent";
import { DB } from "../../../../server/src/dbTypes";

export default function PKOBStrona() {
    const constructionSectionDBEntries = useDBEntriesStore<DB.ConstructionSection>("construction_sections")(); // prettier-ignore
    const constructionDivisionDBEntries = useDBEntriesStore<DB.ConstructionDivision>("construction_divisions")(); // prettier-ignore
    const constructionGroupDBEntries = useDBEntriesStore<DB.ConstructionGroup>("construction_groups")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<DB.ConstructionClass>("construction_classes")(); // prettier-ignore

    return (
        <DBTableEdit
            dbEntries={constructionSectionDBEntries}
            headers={["Sekcje Budowlane"]}
            emptyEntry={{
                id: constructionSectionDBEntries.entryCount + 1,
                name: "",
            }}
            rowInputsProps={[
                {
                    type: "text",
                    entryKey: "name",
                },
            ]}
            RowContentComponent={ConstructionSectionTableEditRowContent}
        />
    );
}
