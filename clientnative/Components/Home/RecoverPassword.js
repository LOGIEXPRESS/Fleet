import axios from "axios";
import React, { useState, useEffect} from "react";
import {
    Text,
    ScrollView,
    ImageBackground,
    Dimensions,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    Modal,
    Alert
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderBar from "../Utils/HeaderBar";
import { API_URLS } from "@env"
import { useNavigation } from "@react-navigation/core";
import ModalSuccess from '../Profile/Edit/ModalsPassword/ModalSuccess';


export default function RecoverPassword(){

    const [email,setEmail]=useState('')
    const [color,setColor]=useState('')

    const navigation = useNavigation();

    const handelChangeMail=(text)=>{
        setEmail(text)
    }
    const handelChangeColor=(text)=>{
        setColor(text)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        const obj={
            eMail:email,
            secret:color
        }

        const objPreuba={
            eMail:'facundo@gmail.com',
            secret:'color'

        }
        
          
          let response=await axios.post(`${API_URLS}/api/recoverPass`,obj)

          if(response.data.menssage==='faltan datos'){
            return Alert.alert('Not found data')
          }
          if(!response.data.payload){
            return Alert.alert(`not found user with email: ${email} and secret ${color}`)

          }

          console.log('response.data: ',response.data)
          console.log('obj recover pass: ',obj)
          setColor('')
          setEmail('')
          changeModalVisible2(true)

        


        
        // navigation.navigate('Login')

    }

    console.log('email de recover: ', email)
    console.log('color de recover: ', color)

      /// --> ESTADO PARA EL MODAL DE SUCCESS <-- ///
    const [isModalVisible2, setisModalVisible2] = useState(false);
    const [chooseData2, setchooseData2] = useState();

    const changeModalVisible2 = (bool) => {
      setisModalVisible2(bool);
    };

    const setData2 = (data) => {
      setchooseData2(data);
    };





    return (

        <ScrollView style={{ flex: 1, backgroundColor: "#ffffffff" }}
            showsVerticalScrollIndicator={false}>
         <View style={{marginTop:hp("-1%"),marginLeft:wp("-2%"), }}> 
        <HeaderBar  screen={'null'} />
         </View> 
            <ImageBackground
                source={require("./logo.png")}
                resizeMode= "contain"
                style={{
                    display:'flex',
                    marginTop:  hp('-1%'),
                    height: hp('35%') ,
                    width: wp('110%') ,
                    alignSelf: "center",
                }}>
            </ImageBackground>
            <View
                style={styles.FormView}
                // onChange={(e) => ChangeInput(e)}
                //   onSubmit={(e) => handleSubmit(e)}
            >
            <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
                <Text style={{ color: "#151f27", fontSize:hp("4%"),fontWeight: '600', }}>Recuperar Contraseña</Text>
            </View>
            <Text style={{ color: "#151f27", fontSize:hp("2.4%"),fontWeight: '600', }}>Ingrese su mail</Text>
            <TextInput
            value={email}
            onChangeText={(name) => handelChangeMail(name)}
            name="mail"
            placeholder="Dirección de Mail*"
            style={styles.TextInput}
            
            //autoFocus={true}

            // returnKeyType="next"
            // onSubmitEditing={() => {
            //   lastNameRef.current.focus();
            // }}
            // blurOnSubmit={false}
            
          ></TextInput>

          <Text style={{marginTop:hp('3%'),color: "#151f27", fontSize:hp("2.4%"),fontWeight: '600'}}>¿Cuál es su color preferido?</Text>

          <TextInput
            value={color}
            onChangeText={(name) => handelChangeColor(name)}
            name="secret"
            placeholder="Color Preferido*"
            secureTextEntry={true}
            style={styles.TextInput}
        //     ref={lastNameRef} onSubmitEditing={() => {
        //       return console.log('done')
        //   }}
           
          
          ></TextInput>
          <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
            <Text style={styles.ButtonText} >
              Recuperar Contraseña
            </Text>
          </TouchableOpacity>
          <Modal
         transparent={true}
         animationType="fade"
         visible={isModalVisible2}
         nRequestClose={() => changeModalVisible2(false)}
        >
        <ModalSuccess
          changeModalVisible2={changeModalVisible2}
          setData2={setData2} />
        </Modal>
        </View>

            



        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    brandView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    brandViewText: {
      color: "#FFC107",
      fontSize: 45,
      fontWeight: "bold",
      textTransform: "uppercase",
      // justifyContent:'flex-start'
    },
    bottonView: {
      flex: 1.5,
      backgroundColor: "#ffffffff",
      bottom: 50,
      borderTopStartRadius: 50,
      borderTopEndRadius: 50,
    },
    FormView: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: -10,
    },
    TextInput: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#ff1c49",
      height: 52,
      borderRadius: 10,
      paddingLeft: 10,
      marginTop: 20,
      color: "#161a23",
    },
    Button: {
      width: "90%",
      color: "#FFC107",
      height: 62,
      backgroundColor: "#ff1c49",
      borderRadius: 10,
      borderColor: "black",
      // borderWidth:1,
      marginTop: hp("6%"),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      shadowOpacity: 30,
      
    },
    ButtonText: {
      // fontWeight: "bold",
      fontSize: 21,
      color: "white",
    },
    SingUpText: {
      color: "#151f27",
      fontSize: 23,
    },
    TextButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      
    },
    preg: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    pregunta: {
      color: "#ff1c49",
    },
  });