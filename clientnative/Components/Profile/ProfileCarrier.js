import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,BackHandler,Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
// import { logiarUsuario } from "./../actions/index";
import { useDispatch, useSelector } from "react-redux";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../Utils/HeaderBar";
import ModalAlert from "../Añadir Transportista/ModalAlert";
import SimpleModal70 from "../Alerts/Travel/SimpleModalmercado";

import { getTravelCarrier } from "../../Redux/actions";
import axios from "axios";
import { API_URLS } from "@env"
import { useFocusEffect } from '@react-navigation/native';


const ProfileCarrier = () => {
  // const resptoken = useSelector((store) => store.respToken);
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const travelCarr=useSelector((store)=>store.carrierTravels)
  const[saldo,setSaldo]=useState(0)
  const[travel,setTravel]=useState(null)
  

  console.log("ID CARRIER ?", data.id);

  const [modalAlert, setModalAlert] = useState(false)

    // validacion mercadopago
    const [isModalVisible70, setisModalVisible70] = useState(false);
    const [chooseData70, setchooseData70] = useState();
    const [activar70, setActivar70] = useState(false);

  
    const changeModalVisible70 = (bool) => {
      setisModalVisible70(bool);
    };
  
    const setData70 = (data) => {
      setchooseData70(data);
    };

    const setActivacion70 = (boole) => {
      setActivar70(boole);
    };

    const handler = () => {
      console.log("mercadopago", data.carrierPaymentData.carrierToken)
      if (data.carrierPaymentData.carrierToken === false) {
        changeModalVisible70(true);
        return;
      }
      navigation.push("ScreenMap");
    }

  console.log("AQUI RESPONLOG EN PROFILEUSERScreen", data);
  // console.log("AQUI RESPTOKEN en PROFILEUSERScreen", resptoken);

  useEffect(() => {
    console.log("data", data);

    const getsaldo=async()=>{

      try{
        let saldo=await axios.get(`${API_URLS}/api/amountCarrier/${data.id}`)
        console.log('SALDOOOOOO: ',saldo.data.payload)
        setSaldo(saldo.data.payload)

      }catch(err){
        console.log(err)
      }
    }
    getsaldo()
    dispatch(getTravelCarrier(data.id))
    // return()=>{dispatch(getTravelCarrier(data.id))} 
  }, [dispatch]);



/*   useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    }
  }, []); */

/*   useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [third])
   */



  const propsChat = { 
    carrierId : data.id,
    userType : "Transportista"
    }



  console.log('travels carrier:',travelCarr)

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <View style={{marginTop:hp("-2%"),marginLeft:wp("0%"),marginBottom:hp("-4%")}}>
        <HeaderBar  screen={'null'} style={{color:"white"}}/>
        </View> */}
           <TouchableOpacity
            style={styles.chat}
            onPress={() => navigation.navigate("Chat", propsChat) }
          >
            <Icon name="chatbox-ellipses-outline" style={styles.iconss} />
            {/* <Text style={styles.userBtnTxt}>Chat</Text> */}

            {/* <Icon name="chevron-forward-outline" style={styles.icons4} /> */}
          </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.containerImg}>

            <Image
              source={{
                uri:
                  data?.photo === null || data?.photo === "url"
                    ? "https://girbaud.vteximg.com.br/arquivos/ids/190690-500-500/Gorra-Para-Hombre-Marithe-Francois-Girbaud1217.jpg?v=637732022965400000"
                    : data?.photo

              }}
              style={styles.userImg}
            />
          </View>

          <Text style={styles.userName}>
            {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)} {data?.lastName.charAt(0).toUpperCase() + data?.lastName.slice(1)}
            {/* {data.name} {data.lastName} */}
          </Text>
          <Text style={styles.empresaName}>
            {/* Transportista en RadioTruck       */}
            Transportista en {data?.business}
          </Text>
          <Text style={styles.saldo}>
            Saldo:      $ {saldo}

          </Text>
        </View>
        <View style={{ flex: 1, marginBottom: wp("60%"), padding: wp("5.5%"), }}>
          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("PersonalDataCarrier")}
          // }}
          >
            <Icon name="person" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Datos Personales</Text>
            {/* <Icon name="chevron-forward-outline" style={styles.icons3} /> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnText}
          onPress={() => {
            navigation.navigate("HistoryCarrier");
          }}
          >
            <Icon name="location" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Historial de viajes</Text>
            {/* <Icon name="chevron-forward-outline" style={styles.icons3} /> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("QuotTravel")}
          >
            <Icon name="calculator" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Cotizar viaje</Text>
            {/* <Icon name="chevron-forward-outline" style={styles.icons4} /> */}
          </TouchableOpacity>
          {/* <Icon name="calculator-outline" style={styles.icons} /> */}
       
                  
          {travelCarr?.payload?.length ?          
          <TouchableOpacity
            style={styles.btn2}
            onPress={()=>navigation.navigate('TravelOn', travelCarr?.payload[0])}
          >
            <Text style={styles.userBtnTxt2}>Ver viaje en Proceso...</Text>
            {/* <Image
              style={{ width: wp('15%'), height: hp('6%'), marginLeft: wp('2%'), marginTop: wp('-2%') }}
              source={require("./Utils/camion.png")}
            /> */}

                {/* <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible70}
                  nRequestClose={() => changeModalVisible70(false)}
                >
                  <SimpleModal70
                    changeModalVisible70={changeModalVisible70}
                    setData70={setData70}
                    setActivacion70={setActivacion70}
                  />
                </Modal> */}
          </TouchableOpacity>:          
          <TouchableOpacity
            style={styles.btn2}
            onPress={handler}
          >
            <Text style={styles.userBtnTxt2}>Comenzar viaje</Text>
            {/* <Image
              style={{ width: wp('15%'), height: hp('6%'), marginLeft: wp('2%'), marginTop: wp('-2%') }}
              source={require("./Utils/camion.png")}
            /> */}

                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible70}
                  nRequestClose={() => changeModalVisible70(false)}
                >
                  <SimpleModal70
                    changeModalVisible70={changeModalVisible70}
                    setData70={setData70}
                    setActivacion70={setActivacion70}
                  />
                </Modal>
          </TouchableOpacity>}


        </View>
       {/*  <Modal
          animationType="slide"
          onDismiss={() => console.log("close")}
          onShow={() => console.log('open')}
          transparent
          visible={modalAlert}
        >
          <View style={styles.containerModal}>
            <View style={styles.DeleteModal}>
              <View style={styles.textModal}>
                <Icon name="checkmark-circle" style={styles.icon_modal} />
                <Text style={styles.btnModalText2}>Estas listo para trabajar?</Text>
                <View style={{ flexDirection: 'row' }}>
                 <TouchableOpacity 
                 style={styles.btnModal}
                 onPress={()=> handler()}
                 >
                   <Text style={styles.btnModalText}>Aceptar</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                 style={styles.btnModal}
                 onPress={() => setModalAlert(false)}
                 >
                   <Text  style={styles.btnModalText}>Cancelar</Text>
                 </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal> */}
      </ScrollView>
    </View>
  );
};

export default ProfileCarrier;

const styles = StyleSheet.create({
  containerImg: {
    marginTop: hp("2%"),
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: "hidden",
    borderColor: "#ff1c49",
    borderWidth: 3,
    //Properties to setup your Shadow

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#000",
    shadowOpacity: 80,
    elevation: 10,
    backgroundColor: "#000",
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'

  },
  DeleteModal: {
    height: hp('26%'),
    width: wp('70%'),
    backgroundColor: '#fff'
  },
  textModal: {
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: hp('4%')
  },
  icon_modal: {
    fontSize: hp("7%"),
    color: "#1DD135",
  },
  btnModal: {
    width: wp('20%'),
    color: "black",
    margin: hp('1%'),
    height: hp('4%'),
    backgroundColor: "#ff1c49",
    borderRadius: hp('1%'),
    marginTop: hp("3%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 50,
    elevation: 10,
},
  icons: {
    alignContent: "center",
    fontSize: hp("3.5%"),
    color: "#ff1c49",
    padding: wp("1.30%"),
    marginRight: wp("4%"),
    marginLeft: wp('1%'),
    backgroundColor: 'white',
    borderRadius: wp('7%'),
    width: wp('10%'),
    height: hp('5.2%'),
    marginTop: wp('-1%')
  },
  icons3: {
    fontSize: hp("2.70%"),
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: wp('1%'),
    marginLeft: wp('22%')
  },
  icons4: {
    fontSize: hp("2.70%"),
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: wp('1%'),
    marginLeft: wp('33.5%')
  },
  perfilTex: {
    fontSize: hp("2.6%"),
    fontWeight: "bold",
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  btnText: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: wp("88%"),
    height: hp("7%"),
    padding: wp('2.5%'),
    borderRadius: wp('3%'),
    shadowOpacity: 80,
    elevation: 16,
    marginTop: wp("7%"),
    borderColor: "#E1E8EB",
    borderWidth: 1.75,
  },
  btn2: {
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#ff1c49",
    width: wp("88%"),
    height: hp("8.5%"),
    padding: wp('5%'),
    borderRadius: wp('4%'),
    shadowOpacity: 80,
    elevation: 15,
    marginTop: wp('7.5%'),
  },
  userImg: {
    // marginTop: wp('-8%'),
    // height: wp('50%'),
    // width: wp('50%'),
    // borderRadius: wp('40%'),
    // borderWidth: wp('1.20%'),
    // borderColor: "#ff1c49",
    height: "100%",
    width: "100%",
  },
  userName: {
    fontSize: 26,
    // fontWeight: "bold",
    // marginTop: 7,
    // marginBottom: wp("3%"),
    // color: "grey"
  },
  empresaName: {
    fontSize: 18,
    // fontWeight: "bold",
    // marginTop: hp("5%"),
    // marginBottom: hp("-7%"),
    color: "#ff1c49",
  },
  saldo: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: hp("3%"),
    marginBottom: hp("-3%"),

  },
  userBtnTxt: {
    marginTop: wp('1%'),
    color: "black",
    textAlign: "center",
    fontSize: hp('2.8%'),
    marginLeft: wp('5.9%'),
    marginTop: wp('0.9%'),
    fontWeight: '700'
  },
  userBtnTxt2: {
    color: "white",
    textAlign: "center",
    fontSize: hp('3.5%'),
    height: hp('12%'),
    marginVertical: hp('-1%'),
    fontWeight: "bold",
  },
  userBtnTxt3: {
    marginTop: wp('1%'),
    color: "black",
    textAlign: "center",
    fontSize: hp('2.5%'),
    marginLeft: wp('11.5%'),
    marginTop: wp('0.9%'),
    fontWeight: '700'
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  btnModalText: {
    fontSize: hp("2%"),
    marginLeft: wp("2%"),
    color: '#ffff'
  },
  btnModalText2: {
    fontSize: hp("2.5%"),
    color: '#000'
  },
  chat:{
    marginTop:hp("3%"),
    marginBottom:hp("-3%"),
    alignSelf: "flex-end",

  },
  iconss: {
    alignContent: "flex-end",
    fontSize: hp("6%"),
    color: "#ff1c49",
    // padding: wp("1.30%"),
    marginRight: wp("5%"),
    marginLeft: wp('1%'),
    backgroundColor: 'white',
    // borderRadius: wp('%'),
    width: wp('12%'),
    height: hp('7%'),
    // marginTop: wp('-1%')
  },
});
