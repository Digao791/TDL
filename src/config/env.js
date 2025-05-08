import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { PORT_SOCKET, PORT_CLIENT }  = process.env;