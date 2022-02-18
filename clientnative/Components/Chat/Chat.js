import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {ScrollView, StyleSheet, Text,TextInput, View, Image,Button, TouchableOpacity, ViewPropTypes , KeyboardAvoidingView } from 'react-native';
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/core";
import { API_URLS } from "@env"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../Utils/HeaderBar";
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const socket = io.connect(`${API_URLS}/`);
                                //setShowChat es para el funcionamiento de la prueba
function Chat(propsChat) {

  const scrollViewRef = useRef();

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
  useEffect(() => {
    setFiltro(-100)
  }, []);
  
 

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
        // if(response.status!==''){ 
        //   let messageData = {
        //     room: room,
        //     author: response.status,//agregar nombre de usuario
        //     message: "I'm Sorry",
        //     time:
        //       new Date(Date.now()).getHours() +
        //       ":" +
        //       new Date(Date.now()).getMinutes(),
        //   };
          
        //   setMessageList((list) => [...list, messageData])
        // }
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
    <KeyboardAwareScrollView>
    <View style={styles.chatWindow}>
        <View style={{marginTop:hp("-2%")}}>
        <HeaderBar  screen={'null'}/>
        </View>
        <Text style={{alignSelf:"center", fontSize:hp("2.89%"), marginTop:hp("-4.5%"), marginBottom:hp("2%"), color:"#ff1c49", fontWeight:"bold"}}>Chat</Text>
      <View style={styles.chatHeader}>
      
        {/* <View style={styles.orden}>
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
        </View> */}
      </View>
      <View style={styles.chatBody}>
        <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        style={styles.messageContainer}>
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
                <View style={{ width: wp("100%") }}>
                  <View
                    style={
                      userType === messageContent.author ||
                      userType === disconect
                        ? styles.messageContentYou
                        : styles.messageContentOther
                    }
                  >
                    <Text style={{color:"white", fontSize:hp("2.4%"), paddingHorizontal:wp("3%"), paddingVertical:hp("2%")}}>{messageContent.message}</Text>
                  </View>
                  <View
                    style={
                      userType === messageContent.author ||
                      userType === disconect
                        ? styles.messageMetaYou
                        : styles.messageMetaOther
                    }
                  >
                    <Text style={{ fontSize: 10, alignSelf:"flex-start", marginLeft:wp("2%"), marginBottom:hp("-1%") }}>
                      {messageContent.time} 
                   
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      {/* {messageContent.author}  */}
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
        <View style={{marginTop:hp("0.7%"), marginLeft:wp("-2%")}}>
        <Button
          title="Enviar"
          color="#ff1c49"
          onPress={() => sendMessage()}
        >
          &#9658;
        </Button>
        </View>
      </View>


    </View>
    </KeyboardAwareScrollView>
  );
}

export default Chat;

const styles = StyleSheet.create({
    chatWindow: {
      width: wp("100%"),
        backgroundColor:"white"
      //  height: 420
      // marginTop:50
      },
      chatHeader: {
        display:"flex",
        flexDirection:"row",
        alignContent:"space-around",
       // height: 45,
        borderRadius: 6,
        // backgroundColor: "steelblue",
        color:"#000",
        backgroundColor:"yellow",
        // position: "relative",
       
      },
      chatBody: {
      //  height: "calc(450 - (45 + 70))",
        // border: "1px solid #263238",
        borderTopWidth:2,
        borderTopColor:"lightgrey",
        backgroundColor: "white",
        width: wp("100%"),
        position: "relative",
        justifyContent:"center"
      },
      messageContainer: {
        
       height: hp("83%"),
      //  borderWidth:  1,
      //  borderColor:"steelblue",
       borderRadius: 4,
      //  overflowY: "scroll",
       // overflowX: "hidden"
      },
      messageYou: {
     //   height: "auto",
        // padding: "10px",
        //display: "flex",
        justifyContent: "flex-end",
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
       maxWidth: hp ("80%"),
        minHeight: 40,
        minWidth: wp("20%"),
        alignItems:"center",
      //  width:auto,
        backgroundColor: "black",
        borderRadius: 15,
        color: "white",
      //  display: "flex",
        alignSelf: "flex-start",
        // marginTop:hp("1%"),
        marginRight: 5,
        marginLeft: 5,
        paddingRight: 5,
        paddingLeft: 5,
        //overflowWrap: "break-word",
       // wordBreak: "break-word",
        justifyContent: "center" ,
        
    },
      messageContentOther: {
       // height: "auto",
        minHeight: 40,
        maxWidth: hp ("80%"),
        backgroundColor: "#6935d0",
        borderRadius: 15,
        color: "white",
        marginTop: 5 ,
        //display: "flex",
        alignItems: "center",
        alignSelf:"flex-end",
        marginRight:5,
        // marginLeft: 5,
        // paddingRight: 5,
        // paddingLeft: 5,
      //  overflowWrap: "break-word",
        // wordBreak: "break-word",
         
        // backgroundColor: "cornflowerblue"
      
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
      display:"flex",
      flexDirection:"row",
      borderTopWidth:  2,
      borderTopColor:"lightgrey",
      //  height: 40,
      //  border: "1px solid #263238",
      //  borderTop: "none",
      //  display: "flex"
      // marginBottom:20
      },
      input: {
       height: hp("7%"),
       width:wp("80%"),
       backgroundColor:"white",
      
        color:'black',
        borderRadius: 4,
        marginLeft:10,
        //border: 0,
       // paddSize: "1em",
       // borderRight: "1px dotted #607d8b",
      
       // outline: "none",
        // fontFamily: "Avenir-Book",
        fontSize:hp("2.4%")
      },
      orden:{
        height:30,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
      },
      button: {
       // border: 0,
        //display: "grid",
        //placeItems: "center",
       // cursor: "pointer",
        // alignItems:"center",
       // height: "100%",
        //background: "transparent",
        //outline: "none",
        fontSize: 15,
        color: "red"
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