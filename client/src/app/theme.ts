import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    strictTokens: true,
    globalCss: {
        "*:focus": {
            boxShadow: "none !important",
            outline: "none !important",
        },
    },
});

export default createSystem(defaultConfig, customConfig);
