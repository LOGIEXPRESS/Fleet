import app from "./src/app";

import { sequelize } from "./src/db";
import { uuid } from 'uuidv4';
import { Travel } from './src/models/Travel';
import { callbackify } from "util";
import { Messaging } from "./src/models/Messaging";
import { create } from "domain";

const { Op } = require("sequelize");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
interface error {
    err: string
}

///begin Sokets


io.on("connection", (socket: any) => {
    console.log("User conneted: " + socket.id)
   
    ///codigo de chat    
         //en este sockets creamos una sala solo para el User y Carrier que partician
       //en un Travel, recibiendo por el parametro data id de la tabla travel
       //creando un room con el nombre del id recibido paa que sea unico
    socket.on("join_room",async (data:any, callback:any) => {
      //Socket join es el que se encarga de drear el room  
      socket.join(data);
         //en la variable sizeRoom tenemos la cantidad de personas que estan conectadas 
         //en esta sala, con esta variabel sabremos si ambos estan conectados
       var sizeRoom = io.sockets.adapter.rooms.get(data)
     
        console.log("sizeRoom en el backend",sizeRoom.size);
    
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
        /////////
    
        // por esta función callback podemos devolver información al front
         callback({
          status: data
          });
    
      });
    
      // A traves de este socket se recibe y se envia la información
      socket.on("send_message", async(data:any, callback:any) => {
        //esn esta variable tenemos cuantas personas hay en la sala,
        //que deberian ser 2 para que esten tanto el carrier como el User
        var sizeRoom = io.sockets.adapter.rooms.get(data.room)
       let room:any;
        if(data.author==='Transportista'){
             room={
            room:data.room,
            messageCarrier:data.message
        }
       }
       if(data.author==='Administrador'){
         room={
       room:data.room,
       messageAdmin:data.message
   }
  } 
       const sala = await Messaging.create(room)
       console.log(data);
       console.log(data.author);
        console.log(sizeRoom.size);
    
        socket.to(data.room).emit("receive_message", data);
        
        
        //si el numero de participantes es 1 devolvemos un mensaje de Offline user
        //que nos servira para validar los mensaje en el front.
        if(sizeRoom.size===1){ 
            var status='offline user';
            
    
    } else var status=''
        callback({
         status:status
         });
      }); 
          
     
    
    // /////
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
      
        });
      
        // A traves de este socket se recibe y se envia la información
        socket.on("send_message", (data:any, callback:any) => {
          //esn esta variable tenemos cuantas personas hay en la sala,
          //que deberian ser 2 para que esten tanto el carrier como el User
          var sizeRoom = io.sockets.adapter.rooms.get(data.room)
       
          console.log(sizeRoom.size);
      
          socket.to(data.room).emit("receive_message", data);
          
          
          //si el numero de participantes es 1 devolvemos un mensaje de Offline user
          //que nos servira para validar los mensaje en el front.
          if(sizeRoom.size===1) var status='offline user'; else var status=''
          callback({
           status:status
           });
        }); 
            
       
      
      // /////
})


////end sokets


sequelize
    .sync({ force: false , logging: false })

    .then(() => {
        console.log('base de datos conectada! :D')
        server.listen( process.env.PORT || 3001, function () {
            console.log('App is listening on port 3001!');
        });
    })
    .catch((err: error) => console.error(err));




