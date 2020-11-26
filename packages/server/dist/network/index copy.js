"use strict";
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
dotenv_1.default.config();
const SERVER_PORT = process.env.SERVER_PORT;
const app = express_1.default();
const server = http_1.default.createServer(app);
const users = new Map();
const sessions = new Map();
app.use(body_parser_1.default.json());
const wss = new ws_1.default.Server({
    clientTracking: false,
    noServer: true,
});
users.set('bob', {
    login: 'bob',
    password: '123456',
});
users.set('mike', {
    login: 'mike',
    password: '123456',
});
sessions.set('1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746', {
    session: '1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746',
    login: 'bob',
});
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
app.post('/login', (req, res) => {
    console.log(req.body);
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
});
app.delete('/logout', (req, res) => {
    const { session } = req.body;
    doLogout(session);
    res.status(200).send({
        result: 'ok',
        data: {
            message: 'Logout'
        }
    });
});
app.get('/user', (req, res) => {
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
});
server.on('upgrade', (req, socket, head) => {
    const session = req.url.substring(2);
    console.log('check', session);
    if (doCheckSession(session)) {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    }
    else {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
    }
});
wss.on('connection', function (ws, req) {
    ws.on('message', (message) => {
        //
        // Here we can now use session parameters.
        //
    });
    ws.on('close', () => {
        // sessions.delete(userId);
    });
});
server.listen(SERVER_PORT, () => {
    console.log(`Listening on http://localhost:${SERVER_PORT}`);
});
// new Game(PORT);
//# sourceMappingURL=index%20copy.js.map