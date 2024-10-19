import { createContext } from "react";

export const MyTableContext = createContext<{
    depth: number;
    backgroundColor: string;
    elementBackgroundColor: string;
} | null>(null);
