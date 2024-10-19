// import React, {
//     ComponentProps,
//     ComponentType,
//     useContext,
//     useMemo,
// } from "react";
// import { MyTableContext } from "../contexts/MyTableContext";
// import { SxProps } from "@mui/material";

// export default function MyTableElement<P extends { sx?: SxProps }>(
//     Component: ComponentType<P>
// ) {
//     const TableElement = (props: ComponentProps<typeof Component>) => {
//         const myTableContext = useContext(MyTableContext);

//         const sx = useMemo(
//             () => ({
//                 ...props.sx,
//                 backgroundColor: myTableContext?.elementBackgroundColor,
//             }),
//             [myTableContext?.elementBackgroundColor, props.sx]
//         );

//         return <Component {...props} sx={sx} />;
//     };
//     return TableElement;
// }

// export default function MyTableElement<TProps>(
//     props: TProps & {
//         Component: ComponentType<TProps & { sx?: SxProps }>;
//     }
// ) {
//     const myTableContext = useContext(MyTableContext);

//     const sx = useMemo(
//         () => ({
//             ...props.sx,
//             backgroundColor: myTableContext?.elementBackgroundColor,
//         }),
//         [myTableContext?.elementBackgroundColor, props.sx]
//     );

//     const Component = props.Component;
//     return <Component {...props} sx={sx} />;
// }
