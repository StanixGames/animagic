"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const Colyseus = __importStar(require("colyseus"));
const db_1 = require("../server/db");
class World extends Colyseus.RelayRoom {
    constructor() {
        super();
        this.onJoin = (client, options) => {
            console.log('join world client', client.userData);
            client.send('JOIN', { hello: 'there' });
        };
        this.onLeave = (client, consented) => {
            console.log('leave world client', client.userData);
            return Promise.resolve();
        };
    }
    onAuth(client, options, req) {
        const { session } = options;
        if (db_1.DB.checkSession(session)) {
            const user = db_1.DB.getUser(session);
            if (!user) {
                return false;
            }
            const { login } = user;
            console.log('known user', user.login);
            client.userData = {
                login,
            };
            return true;
        }
        return false;
    }
}
exports.World = World;
//# sourceMappingURL=World.js.map