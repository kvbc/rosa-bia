# Starostwo-app

## Tech Stack

-   React
-   TypeScript
-   Vite
-   Express
-   MySQL
-   Zod
-   JWT
-   Joy UI

## Application

Diagram

```mermaid
---
title: Application
---
flowchart LR
    subgraph Server
        WSServer[WebSocket Server]
        HTTPServer[HTTP Server]
        SQLiteDatabase[SQLite Database]

        HTTPServer --broadcast--> WSServer
        HTTPServer --query--> SQLiteDatabase
        SQLiteDatabase --response--> HTTPServer
    end
    subgraph Client["Client(s)"]
        ClientAPIModule[API Module]
        ClientWSModule[WebSocket Module]
        ClientPages[Pages]
        ClientApp[App]
        subgraph ClientContexts[Contexts]
            ClientPageContexts[Page Contexts]
            ClientContextWebSocket[WebSocketContext]
            ClientContextTableEdit[TableEditContext]
        end
        subgraph ClientComponents[Components]
            subgraph ClientComponentsTable[Table]
                ClientComponentTableEditRow[TableEditRow]
                ClientComponentTableEdit[TableEdit]
                ClientComponentDBTableEdit[DBTableEdit]
                ClientComponentDBTableEditFilters[DBTableEditFilters]
                ClientComponentTableEditRowInput[TableEditRowInput]
                ClientComponentTableEditRowContent[TableEditRowContent]
            end
            ClientPageComponents[Page Components]
            subgraph ClientComponentsApp[App]
                ClientComponentAppNavbar[AppNavbar]
                ClientComponentAppErrorFallback[AppErrorFallback]
            end

            ClientComponentDBTableEdit --renders--> ClientComponentTableEdit
            ClientComponentDBTableEdit --renders--> ClientComponentDBTableEditFilters
            ClientComponentDBTableEditFilters --supplies--> ClientComponentDBTableEdit
            ClientComponentTableEdit --renders--> ClientComponentTableEditRow
            ClientComponentTableEditRow --notifies--> ClientComponentTableEdit
            ClientComponentTableEdit --notifies--> ClientComponentDBTableEdit
            ClientComponentTableEditRow -.can render.-> ClientComponentTableEditRowInput
            ClientComponentTableEditRow -.can render.-> ClientComponentTableEditRowContent
            ClientComponentTableEditRowContent -.can render.-> ClientComponentTableEditRowInput
            ClientComponentTableEdit <--provides & uses--> ClientContextTableEdit
        end
        subgraph ClientHooks[Hooks]
            ClientHookUseDBTable[useDBTable]
            ClientHookUseAuthEmployee[useAuthEmployee]
            subgraph ClientHooksGlobalStores[Global Stores]
                ClientHooksGlobalStoreAuthEmployee[useAuthEmployeeStore]
            end
        end
        ClientApp --provides--> ClientContextWebSocket
        ClientApp --renders--> ClientPages
        ClientApp --renders--> ClientComponentAppNavbar
        ClientApp -.can render.-> ClientComponentAppErrorFallback
        ClientPageComponents <--> ClientPageContexts
        ClientHookUseAuthEmployee --> ClientHooksGlobalStoreAuthEmployee
        ClientPages --> ClientComponents
        ClientComponentDBTableEdit --> ClientHookUseDBTable
        ClientHooks --> ClientAPIModule
        ClientPages --> ClientHooks
        ClientPages --> ClientPageContexts
    end
    WSServer --broadcast--> ClientWSModule
    ClientAPIModule --request--> HTTPServer
    HTTPServer --response--> ClientAPIModule
```

## TODO

See [TODO.md](./TODO.md)

## Building

`docker compose up --build`

```bat
docker save -o images/client.tar starostwo-app-client:latest
docker save -o images/server.tar starostwo-app-server:latest
```

### On server

copy images from the `images/` folder and copy [docker-compose.yaml](./docker-compose.yaml)

```bat
docker load < server.tar
docker load < client.tar
```

```bat
docker compose up -d
```

## ...

%AppData%/XYplorer/tag.data

## ꙮ𓀐𖡡Ɐ⨎⨍⟊⚙️⫸⧖⧚⧜Ɽ𒋝

-   🌀 ꙮ𖣔⫴⨌𓋑⨘𒀲 𖡆𒋓𓄿.𖡟.
-   🌋 ⫸𖡄𒐫Ɽ𓄿𓋔.
-   🛠️ ⟊⫴𖡑⫷⧖⫸⟊⟆⨌.
-   🚀 ⫷𒋔⨀𒀱⨎⟊⫴𖡰.
-   🌌 ⟆⨙⫴𖣔⟊⟑Ɽ𖡛.
