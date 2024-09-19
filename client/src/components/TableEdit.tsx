import { PropsWithChildren } from "react";

export default function TableEdit({
    headers,
    children,
}: PropsWithChildren<{
    headers: string[];
}>) {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th>{header}</th>
                    ))}
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}
