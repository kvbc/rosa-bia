/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HTTP_SERVER_HOSTNAME: string;
    readonly VITE_WEBSOCKET_SERVER_HOSTNAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
