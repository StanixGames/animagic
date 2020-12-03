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
exports.APIHandler = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const delay = (time) => new Promise((res) => setTimeout(res, time));
const APIHandler = (app) => {
    app.use(express_1.default.json());
    app.use(function (_, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield delay(1000);
        const { login, password } = req.body;
        const session = db_1.DB.login(login, password);
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
        db_1.DB.logout(session);
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
        if (db_1.DB.checkSession(session)) {
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
};
exports.APIHandler = APIHandler;
//# sourceMappingURL=APIHandler.js.map