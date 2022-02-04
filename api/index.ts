import app from "./src/app";

import { sequelize } from "./src/db";
import { uuid } from 'uuidv4';
import { Travel } from './src/models/Travel';
import { callbackify } from "util";
const { Op } = require("sequelize");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
interface error {
    err: string
}

///begin Sokets



io.on("connection", (socket: any) => {
    console.log("User conneted: " + socket.id)

    socket.on("message", async (data: any, callback: any) => {
        console.log(data)

        const { id, orig, destination, weight, price, description } = data


             let TravelId = uuid();
            var newViaje = {
                id: TravelId,
                orig,
                destination,
                weight,
                price,
                description,
                adminId: id
            }
            let traveles = await Travel.create(newViaje)
            // console.log('traveles: ',traveles);
            socket.broadcast.emit('message', newViaje)
            let travel = await Travel.findAll()
            socket.broadcast.emit('Travel', travel)
    
            callback({
                status: TravelId
            });
      


    })
    socket.on("response", async (data: any) => {
        console.log(data)
        const upTravel = await Travel.update({ carrierId: data.carrierId }, { where: {id:data.idTravel} });
        socket.broadcast.emit('response', data)
    })


    socket.on("delete", async (data: any , callback: any) => {
        console.log('Esto es lo que se debe borrar', data)
        const deltTravel = await Travel.destroy({ where: { id: data.id }});
      
    })

    socket.on("confirm_destination", async (data: any , callback: any) => {
        console.log('Esto es el viaje que hay que updatear', data)
        const confirm = await Travel.update({finishedTravel: 'at_destination' }, {where: { id: data}});
        callback({
            status: 'Viaje confirmado exitosamente'
        })
    })

    socket.on("finished_travel", async (data: any , callback: any) => {
        console.log('Esto es el viaje que hay que updatear', data)
        const confirm = await Travel.update({finishedTravel: 'finish' }, {where: { id: data}});
        callback({
            status: 'Viaje confirmado exitosamente'
        })
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})













////end sokets


sequelize
    .sync({ force: true, logging: false })

    .then(() => {
        console.log('base de datos conectada! :D')
        server.listen( process.env.PORT || 3001, function () {
            console.log('App is listening on port 3001!');
        });
    })
    .catch((err: error) => console.error(err));




