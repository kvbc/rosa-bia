import { TdHTMLAttributes } from "react";
import MyTableHTMLElement from "./MyTableHTMLElement";
import React from "react";

export default function MyTableTD(
    props: TdHTMLAttributes<HTMLTableDataCellElement>
) {
    return <MyTableHTMLElement type="td" {...props} />;
}
