import { PropsWithChildren } from "react";
import "./Dropdown.css";

export default function Dropdown({
    title,
    children,
}: PropsWithChildren<{ title: string }>) {
    return (
        <div className="dropdown">
            <button className="dropdown-button">{title}</button>
            <div className="dropdown-content">{children}</div>
        </div>
    );
}
