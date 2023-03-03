"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const express = require("express");
const dotenv = require("dotenv");
const uuid = require("uuid");
dotenv.config();
const app = express();
const server = http_1.default.createServer(app);
const WebSocketServer = new ws_1.default.Server({ server });
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Working');
});
const createRoom = (roomId, player) => {
    const newRoom = {
        roomId,
        players: [player],
        currentStepIndex: 0,
        gameBoard: {}
    };
    rooms.push(newRoom);
};
const clients = [];
const rooms = [];
const joinRoom = (roomId, player) => {
    const room = rooms.find(room => room.roomId === roomId);
    if (!room) {
        throw new Error("not found");
    }
    room.players.push(player);
};
const broadcast = (message) => {
    WebSocketServer.clients.forEach(client => client.send(message));
};
const start = () => {
    server.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    WebSocketServer.on("connection", (wsClient) => {
        clients.push(wsClient);
        wsClient.on("message", message => {
            const req = JSON.parse(message.toString());
            switch (req.event) {
                case "JOIN_GAME":
                    const player = req.payload.player;
                    player["client"] = wsClient;
                    joinRoom(req.payload.roomId, player);
                    break;
                case "ROOMS_LIST":
                    const { page, offset } = req.payload;
                    const date = rooms.slice(page * offset, (page + 1) * offset);
                    // console.log(date)
                    wsClient.send(JSON.stringify({ event: "ROOMS_LIST", payload: { rooms: date } }));
                    break;
                case "CREATE_GAME":
                    const roomId = uuid.v4().slice(0, 4);
                    createRoom(roomId, Object.assign(Object.assign({}, req.payload.player), { client: wsClient }));
                    wsClient.send(JSON.stringify({ event: "ROOM_ID", payload: { roomId } }));
                    break;
                case "play":
                    const { x, y } = req.payload;
                    const room = rooms.find(room => room.roomId === req.payload.roomId);
                    // const currentPlayer = room.players[room.currentStepIndex]
                    const message = {
                        event: "shot-fired",
                        payload: { x, y }
                    };
                    room.players.forEach(player => player.client.send(JSON.stringify(message)));
                    room.currentStepIndex = (room.currentStepIndex + 1) % 2;
                    const nextPlayer = room.players[room.currentStepIndex];
                    const turnMessage = {
                        event: "next-turn",
                        payload: { player: nextPlayer }
                    };
                    room.players.forEach(player => player.client.send(JSON.stringify(turnMessage)));
                    break;
            }
        });
        wsClient.on("error", e => wsClient.send(e.message));
        wsClient.on("close", () => {
            clients.splice(clients.indexOf(wsClient));
        });
    });
};
start();
