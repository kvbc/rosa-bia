import { Database } from "sqlite3";

export const loadDatabase = () => {
    const db = new Database("db/db.db");

    db.on("trace", (sql: string) => {
        // 0123456789
        // 01234
        const lines = [];
        const CHARS_PER_LINE = 80;
        for (
            let lineIndex = 0;
            lineIndex < sql.length / CHARS_PER_LINE;
            lineIndex++
        ) {
            const line = sql.substring(
                lineIndex * CHARS_PER_LINE,
                (lineIndex + 1) * CHARS_PER_LINE
            );
            lines.push(line);
        }
        console.log("> ", lines.at(0));
        for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
            console.log("| ", lines.at(lineIndex));
        }
        console.log("");
    });

    db.on("error", (err: Error) => {
        console.error(err, "\n");
    });

    return db;
};
