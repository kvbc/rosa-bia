/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_HOSTNAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
