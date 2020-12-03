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
exports.WorldRoom = void 0;
const Colyseus = __importStar(require("colyseus"));
const db_1 = require("../db");
const State_1 = require("./State");
class WorldRoom extends Colyseus.Room {
    onCreate(options) {
        this.setState(new State_1.State());
        this.state.initialize();
        console.log('created', options);
    }
    onAuth(client, options, req) {
        const { session } = options;
        console.log('get session ', session);
        if (db_1.DB.checkSession(session)) {
            console.log('known user');
            return true;
        }
        return false;
    }
    onJoin(client, options) {
        console.log('joined', client, options);
    }
    update(delta) {
        this.state.update(delta);
    }
}
exports.WorldRoom = WorldRoom;
//# sourceMappingURL=WorldRoom.js.map