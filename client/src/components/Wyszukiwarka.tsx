import { PropsWithChildren, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Wyszukiwarka({
    liczbaWynikow,
    fetchWyniki,
    children,
}: PropsWithChildren<{
    liczbaWynikow: number;
    fetchWyniki: (startIndex: number, endIndex: number) => () => void; // return destructor
}>) {
    const [liczbaWynikowNaStrone, setLiczbaWynikowNaStrone] =
        useState<number>(25);
    const [strona, setStrona] = useState<number>(1);
    const startIndex = (strona - 1) * liczbaWynikowNaStrone;
    const endIndex = strona * liczbaWynikowNaStrone;
    const liczbaStron = Math.ceil(liczbaWynikow / liczbaWynikowNaStrone);
    const minStrona = Math.max(0, strona - 3);
    const maxStrona = Math.min(liczbaStron, strona + 3);

    useEffect(() => {
        setStrona(1);
    }, [liczbaWynikowNaStrone]);

    useEffect(() => {
        return fetchWyniki(startIndex, endIndex);
    }, [strona, liczbaWynikowNaStrone]);

    const StronaButton = ({ strona: thisStrona }: { strona: number }) => {
        return (
            <Link
                to=""
                onClick={() => setStrona(thisStrona)}
                className={
                    thisStrona === strona
                        ? "font-medium"
                        : "font-medium text-blue-600 dark:text-blue-500 hover:underline"
                }
            >
                {thisStrona}
            </Link>
        );
    };

    const Strony = () => {
        return (
            <div className="flex gap-3 justify-center">
                {minStrona > 1 && (
                    <>
                        <StronaButton strona={1} />
                        <span>...</span>
                    </>
                )}
                {Array.from({ length: liczbaStron }).map(
                    (_, i) =>
                        i + 1 >= minStrona &&
                        i + 1 <= maxStrona && (
                            <StronaButton key={i + 1} strona={i + 1} />
                        )
                )}
                {maxStrona < liczbaStron && (
                    <>
                        <span>...</span>
                        <StronaButton strona={liczbaStron} />
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="text-center h-full p-1">
            <span>Liczba wyników: {liczbaWynikow}</span>
            <br />
            <span>
                Liczba wyników na stronę:{" "}
                <select
                    value={liczbaWynikowNaStrone}
                    onChange={(e) =>
                        setLiczbaWynikowNaStrone(Number(e.target.value))
                    }
                >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="250">250</option>
                    <option value="500">500</option>
                </select>
            </span>
            <br />
            <br />
            <Strony />
            <br />
            {children}
            <br />
            <Strony />
        </div>
    );
}
