import { HTMLAttributes } from "react";
import MyTableHTMLElement from "./MyTableHTMLElement";
import React from "react";

export default function MyTableTR(props: HTMLAttributes<HTMLTableRowElement>) {
    return <MyTableHTMLElement type="tr" {...props} />;
}
