// src/services/socket.ts
import { io } from "socket.io-client";

export const statsSocket = io("http://localhost:3000/stats", {
    transports: ["websocket"],
});
