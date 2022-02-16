import axios from "axios";
import React, { useEffect, useState } from "react";
import {ScrollView, StyleSheet, Text,TextInput, View, Image,Button, TouchableOpacity } from 'react-native';
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/core";
import { API_URLS } from "@env"

const socket = io.connect(`${API_URLS}/`);
                                //setShowChat es para el funcionamiento de la prueba
function Chat(propsChat) {

  const userType = propsChat.route.params.userType

  const carrierId =propsChat.route.params.carrierId

  console.log("userType", userType);

  const navigation = useNavigation();
  //disconect esta variable donde vamos a guardar la resTextuesta del back
  //que nos Textermitira saber si estan ambos conctados al chat
  const [disconect, setDisconect] = useState("");
  //room: en esta variable guardaremos el id del travel Textara crear el room del chat
  //y mantenerlo vinculado
  const [room, setRoom] = useState("");
  //currentMessage: aqui se guarda el mensaje actual
  const [currentMessage, setCurrentMessage] = useState("");
  //messageList: se va guardando toda la lista de mensajes
  const [messageList, setMessageList] = useState([]);
 
  const [filtro, setFiltro] = useState("");
  
   
 

socket.emit("join_room", carrierId, (response) => {
 //aqui estamos envian al back el id del travel Textara crear el room
  
 //ResTextonse.status contiene la resTextuesta enviada desde el back
 //que en este caso creamos un objeto con todos los datos del travel vinculados
 //con las tablas User y carrier
  console.log(response.status)
  setRoom(response.status); // ok
  //con la variable userTyTexte estamos contralando cual de los usuarios esta desconectado
  //si userTyTexte es 1 es usuario conectado es User y el desconectado carrier 
  // y si es 0 lo contraio
  });

  //La funcion sendMessage es la funcion que nos va a Textermitir enviar los mensajes
  //esta sera usada al momento de darle al boton enviar mensaje
  const sendMessage = async () => {
     
    if (currentMessage !== "") {
      //messageDate es el objeto que nos Textermitira agruTextar 
      //los datos necesarios Textara enviar los mensajes
      const messageData = {
        room: room,
        author: userType,//agregar nombre de usuario
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
    //en este sockets enviaremos el mensaje al back
      await socket.emit("send_message", messageData, (response) => {
        //este envio nos devolvera una resTextuesta quenos servira Textara valiar 
        //si el otro usuario esta conectado y crear la resTextuesta de usuario offline user
        console.log(response.status);
        if(response.status!==''){ 
          let messageData = {
            room: room,
            author: response.status,//agregar nombre de usuario
            message: "I'm Sorry",
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
          
          setMessageList((list) => [...list, messageData])
        }
        });


      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  //en este useEffect estamos escuchando las respuestas de los 
  //mensaje recibidos que vienen del back
  useEffect(async()=>{
    try{
  
      
      const resp= await   axios
             .get(`${API_URLS}/api/findMessage?id=`+carrierId, {
             
         })
         .then((res) => {
          console.log(res.data)
          setMessageList(res.data)
//setFleet(res.data);
         });
       
       }
    catch(err){
       console.error(err)
     }
  },[])
  
  useEffect(() => {

    socket.on("receive_message", async(data) => {

      try{
          const resp= await   axios.get(`${API_URLS}/api/findMessage?id=`+carrierId)
           .then((res) => {
            //console.log(res.data)
            setMessageList(res.data)
 
           });

         }
      catch(err){
         console.error(err)
       }
      data="";
    });
  }, [socket]);

 
  return (
    <View style={styles.chatWindow}>
      <View style={styles.chatHeader}>
        <Text>
          <TouchableOpacity
            style={{
              borderRadius: 6,
              width: 45,
              height: 15,
              backgroundColor: "blue",
            }}
            onPress={() => setFiltro(-5)}
          >
            <Text style={{ fontSize: 12, color: "white", marginLeft: 10 }}>
              ult.5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 6,
              width: 45,
              height: 15,
              backgroundColor: "blue",
            }}
            onPress={() => setFiltro(-15)}
          >
            <Text style={{ fontSize: 12, color: "white", marginLeft: 7 }}>
              ult.15
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 6,
              width: 45,
              height: 15,
              backgroundColor: "blue",
            }}
            onPress={() => setFiltro(-100)}
          >
            <Text style={{ fontSize: 12, color: "white", marginLeft: 7 }}>
              Todos
            </Text>
          </TouchableOpacity>
        </Text>
        <Text style={{ marginLeft: 180 }}>Live Chat</Text>
      </View>
      <View style={styles.chatBody}>
        <ScrollView style={styles.messageContainer}>
          {messageList.slice(filtro?filtro:-5).map((messageContent,index) => {
            return (
              <View
                style={
                  userType === messageContent.author || userType === disconect
                    ? styles.messageYou
                    : styles.messageOther
                }
                /* aqui Textodemos controlar los estitilos segun el usuario*/
                key={index}
              >
                <View style={{ width: 500 }}>
                  <View
                    style={
                      userType === messageContent.author ||
                      userType === disconect
                        ? styles.messageContentYou
                        : styles.messageContentOther
                    }
                  >
                    <Text>{messageContent.message}</Text>
                  </View>
                  <View
                    style={
                      userType === messageContent.author ||
                      userType === disconect
                        ? styles.messageMetaYou
                        : styles.messageMetaOther
                    }
                  >
                    <Text style={{ fontSize: 10 }}>
                      {messageContent.time} {messageContent.author}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.chatFooter}>
        <TextInput
          style={styles.input}
          placeholder="Escriba aquí su mensaje..."
          onChangeText={(currentMessage) => setCurrentMessage(currentMessage)}
          defaultValue={currentMessage}
          // onKeyTextress={(event) => {
          //   event.key === "Enter" && sendMessage();
          // }}
        />
        {/* hacemos uso de la funcion sendMessage  */}
        <Button
          title="Enviar"
          onPress={() => sendMessage()}
          style={styles.button}
        >
          &#9658;
        </Button>
      </View>


    </View>
    
  );
}

export default Chat;

const styles = StyleSheet.create({
    chatWindow: {
        width: 400,
      //  height: 420
      marginTop:50
      },
      chatHeader: {
       // height: 45,
        borderRadius: 6,
        backgroundColor: "steelblue",
        color:"#000",
        position: "relative",
       // alignItems:"center"
      },
      chatBody: {
      //  height: "calc(450 - (45 + 70))",
        // border: "1px solid #263238",
        backgroundColor: "#fff",
      
        position: "relative"
      },
      messageContainer: {
        width: 400,
       height: 400,
       borderWidth:  1,
       borderColor:"steelblue",
       borderRadius: 4,
      //  overflowY: "scroll",
       // overflowX: "hidden"
      },
      messageYou: {
     //   height: "auto",
        // padding: "10px",
        //display: "flex",
        justifyContent: "flex-start",
        borderColor:"black"

    },
      messageOther: {
        height: "auto",
        // padding: "10px",
        //display: "flex",
        justifyContent: "flex-end",
      
         
    },
      
      messageContentYou: {
        width: "auto",
       // height: "auto",
        minHeight: 40,
        maxWidth: 200,
        backgroundColor: "#43a047",
        borderRadius: 5,
        color: "white",
      //  display: "flex",
        alignItems: "center",
        marginRight: 5,
        marginLeft: 5,
        paddingRight: 5,
        paddingLeft: 5,
        //overflowWrap: "break-word",
       // wordBreak: "break-word",
        justifyContent: "flex-start"  
    },
      messageContentOther: {
        width: "auto",
       // height: "auto",
        minHeight: 40,
        maxWidth: 200,
        backgroundColor: "#43a047",
        borderRadius: 5,
        color: "white",
        //display: "flex",
        alignItems: "center",
        marginRight:5,
        marginLeft: 200,
        paddingRight: 5,
        paddingLeft: 5,
      //  overflowWrap: "break-word",
        // wordBreak: "break-word",
         
        backgroundColor: "cornflowerblue"
      
      },
      messageMetaYou: {
         
        marginLeft: 1,
      //  display: "flex",
        fontSize: 12,
      maxWidth:300
      },
      messageMetaOther: {
        
        marginLeft: 200,
        //display: "flex",
        fontSize: 12,
        maxWidth:300
      
      },
      
        messageMetaAuthor: {
        marginLeft: 10,
        fontWeight: "bold",
        //display: "flex",
        fontSize: 12
    
    },
    chatFooter: {
      //  height: 40,
      //  border: "1px solid #263238",
      //  borderTop: "none",
      //  display: "flex"
      marginBottom:20
      },
      input: {
      //  height: "100%",
      borderWidth:  1,
      borderColor:"steelblue",
        color:'black',
        borderRadius: 4,
        //border: 0,
       // paddSize: "1em",
       // borderRight: "1px dotted #607d8b",
      
       // outline: "none",
        fontFamily: "sans-serif",
      },
      button: {
       // border: 0,
        //display: "grid",
        //placeItems: "center",
       // cursor: "pointer",
        flex: 20,
       // height: "100%",
        //background: "transparent",
        //outline: "none",
        fontSize: 25,
        color: "lightgray"
      },
      Button: {
        width: "90%",
        color: "#FFC107",
        height: 52,
        backgroundColor: "#ff1c49",
        borderRadius: 10,
        borderColor: "black",
        // borderWidth:1,
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 80,
        elevation: 15,
      },
      ButtonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
      },
      
  });

  // <View  style={styles.chatHeader}>
  //       <Text>Live Chat</Text>
  //     </View>
  //     <View style={styles.chatBody}>
  //       <ScrollView style={styles.messageContainer}> 
  //         {messageList.map((messageContent) => {
  //           return (
  //             <View
  //             style={username === messageContent.author || username ===disconect ? styles.messageYou : styles.messageOther}
  //                /* aqui Textodemos controlar los estitilos segun el usuario*/
                
  //             >
  //               <View>
  //                 <View style={username === messageContent.author || username ===disconect ? styles.messageContentYou : styles.messageContentOther}>
  //                   <Text>{messageContent.message}</Text>
  //                 </View>
  //                 <View style={username === messageContent.author || username ===disconect ? styles.messageMetaYou : styles.messageMetaOther}>
  //                   <Text>{messageContent.time}</Text>
  //                   <Text >{messageContent.author}</Text>
  //                 </View>
  //               </View>
  //             </View>
  //           );
  //         })}
  //       </ScrollView>
  //     </View>
  //     <View style={styles.chatFooter}>
  //       <TextInput
  //         style={styles.input}
  //         value={currentMessage}
  //         Textlaceholder="Hey..."
  //         onChange={(event) => {
  //           setCurrentMessage(event.target.value);
  //         }}
  //         onKeyTextress={(event) => {
  //           event.key === "Enter" && sendMessage();
  //         }}
  //       />
  //       { /* hacemos uso de la funcion sendMessage  */}
  //       <Button title="" onPress={sendMessage} style={styles.button}>&#9658;</Button>
  //     </View>