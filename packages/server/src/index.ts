import dotenv from "dotenv";

import { Game } from './game';

dotenv.config();

const PORT = process.env.SERVER_PORT;

new Game(PORT);
