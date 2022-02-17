import React, { useState } from 'react'
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import axios from 'axios'
import {Chat} from "./Chat";

const Fleet = ({handleRadio,socket}) => {
    const [showChat, setShowChat] = useState(false);
    const [fleet,setFleet]= useState("")
    const [userType, setUserType] = useState("");
    useEffect(async() => {
        try{
  
      
            const resp= await   axios
                   .get('https://superfleetback.herokuapp.com/api/findFleet', {
                   
               })
               .then((res) => {
                //console.log(res.data)
                setFleet(res.data);
               });
             
             }
          catch(err){
             console.error(err)
           }
          }, []);     
    // console.log(fleet);
  if(fleet)fleet.map(e=>console.log(e.transportista));
    return (
      <View>
        {!showChat ? (
          fleet ? (
            <View>
              {fleet.map((e, index) => {
                return (
                  <View style={{ width: 200 }} key={index}>
                    <Text>
                      {e.transportista.name} {e.transportista.lastName}
                      <TouchableOpacity
                        style={{
                          marginLeft: 50,
                          width: 25,
                          height: 15,
                          backgroundColor: "steelblue",
                        }}
                        onPress={() => handleRadio(1, e.transportista.id)}
                      >
                        <Text style={{ fontSize: 12, color: "white" }}>
                          Chat
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                );
              })}
              <Button
                style={{ marginTop: 40 }}
                title="Atras"
                onPress={() => handleRadio(3)}
              />
            </View>
          ) : (
            <Text>Esta vacio</Text>
          )
        ) : (
          <Text>
            <Button title="Atras" onPress={() => handleRadio(3)} />
          </Text>
        )}
      </View>
    );
}

export default Fleet

// return( <View  key={index}>{e.transportista.name}
//   {/*               
//                         <Text> {e.transportista.name} {e.transportista.lastName}</Text>
              
//                           <TouchableOpacity style={{marginLeft:20,width:25, height: 15, backgroundColor:"steelblue" }} onPress={()=>handleRadio(1,e.transportista.id)}>
//                               <Text style={{fontSize:12,color:"white",}} >Chat</Text>
//                           </TouchableOpacity> */}
  
//                     </View>
//                    )
