import { ThHTMLAttributes } from "react";
import MyTableHTMLElement from "./MyTableHTMLElement";
import React from "react";

export default function MyTableTH(
    props: ThHTMLAttributes<HTMLTableHeaderCellElement>
) {
    return <MyTableHTMLElement type="th" {...props} />;
}
