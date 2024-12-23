// extended

import { useLocation } from "react-router-dom";
import { AppNavbarLink } from "./AppNavbarLink";
import { Tooltip } from "@/components/ui/tooltip";

export const AppNavbarLinkEx = ({
    label,
    path,
    tooltip,
}: {
    label: string;
    path: string;
    tooltip?: string;
}) => {
    const location = useLocation();
    const isCurrent = location.pathname === path;

    const link = (
        <AppNavbarLink
            key={label}
            to={path}
            overflow="visible"
            outlineStyle="solid"
            outlineColor="blue.900"
            outlineWidth="0px"
            {...(isCurrent && {
                backgroundColor: "blue.900",
                // color: "blue.50",
                outlineWidth: "3px",
                // padding: "0.5",
                textDecoration: "underline",
            })}
        >
            {label}
        </AppNavbarLink>
    );

    if (tooltip) {
        return <Tooltip content={tooltip}>{link}</Tooltip>;
    }

    return link;
};
