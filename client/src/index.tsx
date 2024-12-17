import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import "./index.css";

// import whyDidYouRender from "@welldone-software/why-did-you-render";
// if (process.env.NODE_ENV === "development") {
//     whyDidYouRender(React, {
//         trackAllPureComponents: true, // Tracks all pure components
//         logOnDifferentValues: true, // Logs changes when props or state differ
//         include: [/./], // Include all components (can filter with regex)
//     });
// }

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
