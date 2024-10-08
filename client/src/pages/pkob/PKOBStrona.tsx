import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { MyInputSelectOption } from "../../components/MyInput";
import Wyszukiwarka from "../../components/Wyszukiwarka";
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

export default function PKOBStrona() {
    const constructionSectionDBEntries =
        useDBEntriesStore<PKOB.ConstructionSection>("sekcje_budowlane")();
    const constructionDivisionDBEntries =
        useDBEntriesStore<PKOB.ConstructionDivision>("dzialy_budowlane")();
    const constructionGroupDBEntries =
        useDBEntriesStore<PKOB.ConstructionGroup>("grupy_budowlane")();
    const constructionClassDBEntries =
        useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")();

    const constructionFormDBEntries =
        useDBEntriesStore<PKOB.ConstructionForm>("formy_budownictwa")();
    const spatialPlanDBEntries = useDBEntriesStore<PKOB.SpatialPlan>(
        "planowania_przestrzenne"
    )();

    return (
        <>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <FaDatabase />
                        Dane
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <DBTableEdit
                        dbEntries={constructionSectionDBEntries}
                        headers={["Sekcje Budowlane"]}
                        emptyEntry={{
                            id: constructionSectionDBEntries.entryCount + 1,
                            sekcja: "",
                        }}
                        rowInputsProps={[
                            {
                                type: "text",
                                entryKey: "sekcja",
                            },
                        ]}
                        RowContentComponent={
                            ConstructionSectionTableEditRowContent
                        }
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <FaGear />
                        Konfiguracja
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Tabs size="sm">
                        <TabList>
                            <Tab>
                                <IoIosConstruct />
                                Formy Budownictwa
                            </Tab>
                            <Tab>
                                <GrPlan />
                                Planowania przestrzenne
                            </Tab>
                        </TabList>
                        <TabPanel value={0}>
                            <DBTableEdit
                                dbEntries={constructionFormDBEntries}
                                headers={["ID", "Forma Budownictwa"]}
                                emptyEntry={{
                                    id: 0,
                                    forma: "",
                                }}
                                rowInputsProps={[
                                    {
                                        type: "number",
                                        entryKey: "id",
                                        uneditable: true,
                                    },
                                    {
                                        type: "text",
                                        entryKey: "forma",
                                    },
                                ]}
                            />
                        </TabPanel>
                        <TabPanel value={1}>
                            <DBTableEdit
                                dbEntries={spatialPlanDBEntries}
                                headers={["ID", "Planowanie Przestrzenne"]}
                                emptyEntry={{
                                    id: 0,
                                    planowanie: "",
                                }}
                                rowInputsProps={[
                                    {
                                        type: "number",
                                        entryKey: "id",
                                        uneditable: true,
                                    },
                                    {
                                        type: "text",
                                        entryKey: "planowanie",
                                    },
                                ]}
                            />
                        </TabPanel>
                    </Tabs>
                </AccordionDetails>
            </Accordion>
        </>
    );
}
