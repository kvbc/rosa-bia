//
// WebSocketContext.tsx
// Context providing the WebSocket for the entire application
//

import { createContext } from "react";

const WebSocketContext = createContext<WebSocket | null>(null);

export default WebSocketContext;
