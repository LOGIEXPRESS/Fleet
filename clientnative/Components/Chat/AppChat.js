import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native'; 
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {ScrollView, StyleSheet, Text,TextInput, View, Image,Button } from 'react-native';
 
import Chat from './components/Chat';
import Fleet from './components/Fleet';
//Creamos una conección
const socket = io.connect("https://superfleetback.herokuapp.com/");
function App() {
  //estas variables de estado es para condicionar el renderizado 
  //Estas variables la usamos solo para el funcionamiento de este ejemplo
  let [userType, setUserType] = useState("");
 
  const [showChat, setShowChat] = useState(false);
  const [id, setId] = useState(false);
 
  function handleRadio(e, carrierId) {
    // alert(e)
    if (e === 0) {
      setId(carrierId);
      setUserType("Transportista");
    }
    if (e === 1) {
      setId(carrierId);
      setUserType("Administrador");
    }
    if (e === 2) setUserType(2);
    if (e === 3) setUserType("");

    if (e < 2) setShowChat(true);
  }
  ///
  return (
    <View style={styles.container}>
      
      {!showChat ? (
        <View>   
          {/* <Button
            title="Administrador"
            onPress={()=>handleRadio(1)}
          />  */}

          {userType<2?(
            <View>
                <Button
                
                title="Consultar Flota"
                onPress={()=>handleRadio(2)}
              /> 
              
              <Button
              style={{marginTop:100}}
                title="Transportista"
                onPress={()=>handleRadio(0,"0029abfb-cc79-4624-aede-aeff02ca4968")}
              />
              </View>
          ):(
            <Fleet socket={socket} handleRadio={handleRadio}/>
          )}
          
          
         
        </View>
) : (
    /* enviamos el socket por una props   */
    <Chat socket={socket} carrierId={id} setUserType={setUserType} userType={userType} setShowChat={setShowChat} />
 )}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
//   joinChatContainer: {
//   //display: flex,
//   //flexDirection: column,
//   // textAlign: center,
//   // fontSize: "2.5rem",
//   // marginBottom: "1rem"
// }
});
// {!showChat ? (
//   <View style={styles.joinChatContainer}>
  
// ) : (
//   /* enviamos el socket por una props   */
//   <Chat socket={socket} userType={userType} />

// )}