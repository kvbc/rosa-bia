import {
    createElement,
    HTMLAttributes,
    ReactHTML,
    useContext,
    useMemo,
} from "react";
import { MyTableContext } from "../contexts/MyTableContext";

export default function MyTableHTMLElement<TElement extends HTMLElement>({
    type,
    ...props
}: HTMLAttributes<TElement> & { type: keyof ReactHTML }) {
    const myTableContext = useContext(MyTableContext);

    const style = useMemo(
        () => ({
            ...props.style,
            // filter: `brightness(${
            //     (10.0 - (myTableContext?.depth ?? 0)) / 10.0
            // })`,
            // backgroundColor: myTableContext?.elementBackgroundColor,
        }),
        // [myTableContext?.elementBackgroundColor, props.style]
        [myTableContext?.elementBackgroundColor, props.style]
    );

    return createElement(type, { ...props, style });
}
