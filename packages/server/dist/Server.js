"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const network_1 = require("./network");
const Game_1 = require("./Game");
dotenv_1.default.config();
const SERVER_PORT = process.env.SERVER_PORT;
const delay = (time) => new Promise((res) => setTimeout(res, time));
const app = express_1.default();
const server = http_1.default.createServer(app);
const users = new Map();
const sessions = new Map();
const players = new Map();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
const wss = new ws_1.default.Server({
    clientTracking: false,
    noServer: true,
});
users.set('bob', {
    login: 'bob',
    password: '123456',
    firstName: 'Bob',
    lastName: 'Marley',
});
users.set('mike', {
    login: 'mike',
    password: '123456',
    firstName: 'Mike',
    lastName: 'Vazovsky',
});
// sessions.set('1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746', {
//   session: '1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746',
//   login: 'bob',
// });
// players.set('bob', {
//   login: 'bob',
//   playerEntityId: '12345',
// })
const doLogin = (login, password) => {
    if (users.has(login) && users.get(login).password === password) {
        for (let s of sessions.values()) {
            if (s.login === login) {
                return s.session;
            }
        }
        const session = `${uuid_1.v4()}.${uuid_1.v4()}`;
        sessions.set(session, {
            session,
            login,
        });
        return session;
    }
    return null;
};
const doLogout = (session) => {
    if (sessions.has(session)) {
        sessions.delete(session);
    }
};
const doCheckSession = (session) => {
    return sessions.has(session);
};
const doGetUser = (session) => {
    if (!sessions.has(session)) {
        return null;
    }
    const { login } = sessions.get(session);
    if (!users.has(login)) {
        return null;
    }
    return users.get(login);
};
// const doGetPlayer = (session: string): Entity | null => {
//   const user = doGetUser(session);
//   if (!user) {
//     return null;
//   }
//   const { login } = user;
//   const playerEntity = game.worldManager.getPlayerEntity(login);
//   return playerEntity;
// }
// const doCreatePlayer = (session: string) => {
// }
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(1000);
    const { login, password } = req.body;
    const session = doLogin(login, password);
    if (!session) {
        res.status(400).send({
            result: 'error',
            data: {
                message: 'Invalid credentials',
            }
        });
    }
    else {
        res.status(200).send({
            result: 'ok',
            data: {
                session,
            },
        });
    }
}));
app.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(1000);
    const { session } = req.body;
    doLogout(session);
    res.status(200).send({
        result: 'ok',
        data: {
            message: 'Logout'
        }
    });
}));
app.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(1000);
    const { session } = req.body;
    if (doCheckSession(session)) {
        res.status(200).send({
            result: 'ok',
            data: {
                firstName: 'Test',
                lastName: 'Test',
            }
        });
    }
    else {
        res.status(401).send({
            result: 'error',
            data: {
                message: 'Invalid session',
            }
        });
    }
}));
server.on('upgrade', (req, socket, head) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('wait 1 sec');
    // await delay(1000);
    // console.log('done wait');
    const session = req.url.substring(2);
    const user = doGetUser(session);
    if (doCheckSession(session) && user) {
        wss.handleUpgrade(req, socket, head, (ws) => {
            const { login, firstName, lastName, } = user;
            network_1.NetworkManager.handleConnection(ws, session, login, firstName, lastName);
            wss.emit('connection', ws, req);
        });
    }
    else {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
    }
}));
wss.on('connection', function (socket, req) {
    socket.on('message', (message) => {
        // console.log(message);
        try {
            const packet = network_1.PacketManager.parsePacket(message, socket);
            if (!packet) {
                console.log('Invalid Packet!', message);
                return;
            }
            network_1.PacketManager.queuePacket(packet);
        }
        catch (e) {
            console.error(e.message);
        }
    });
    socket.on('close', () => {
        // sessions.delete(userId);
    });
});
server.listen(SERVER_PORT, () => {
    console.log(`Listening on http://localhost:${SERVER_PORT}`);
});
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    Game_1.game.destroy();
});
//# sourceMappingURL=server.js.map