import app from "./src/app";

import { sequelize } from "./src/db";
import { uuid } from 'uuidv4';
import { callbackify } from "util";
const { Op } = require("sequelize");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
interface error {
    err: string
}



sequelize
    .sync({ force: false, logging: false })

    .then(() => {
        console.log('base de datos conectada! :D')
        server.listen(3001, function () {
            console.log('App is listening on port 3001!');
        });
    })
    .catch((err: error) => console.error(err));




