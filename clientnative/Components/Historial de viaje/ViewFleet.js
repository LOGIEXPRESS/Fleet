import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Modal
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import HeaderBar from "../Utils/HeaderBar.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/Ionicons";
import { userStatus, reset, alltravelstruck } from "../../Redux/actions/index.js";
import ModalAlert from '../Añadir Transportista/ModalAlert.js'


const HistorialDeViaje = () => {



  const responlog = useSelector((store) => store.responseLog)
  const travelstruck = useSelector((store) => store.alltraveltruck)
  const user = useSelector((store) => store.userStatus)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalView, SetModalView] = useState(false);

  const handleTravelOn = (id) => {
    dispatch(alltravelstruck(id))
  }


/* 
  useEffect(() => {
    if (travelstruck) {
      console.log("ESTO SERIAN LOS TRAVELSTRUCK", travelstruck)
      if (travelstruck.travelinprocess.length === 0) {
        SetModalView(true)
      } else {
        navigation.navigate('AdmTravelOn', travelstruck.travelinprocess[0])
      }
    }
  }, [travelstruck]) */



  useEffect(() => {
    dispatch(userStatus())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  console.log("Esto serian los usersWWWWWWWWWWW:", user)
 /*  console.log("Esto serian los users:", user) */




  const CarrierContainer = (props) => {
    console.log("ESTO ES LO QUE LE VA A LLEGAR AL COMPONENTE", props)
  


    return (
      <View>
        {
          props.length !== 0 ? props.map((e, index) => {


            const propss = {
              amount : e.payment.length?e.payment.filter(p=>p.status===false)[0]?.amount:0,
              acesstoken: e.acesstoken,
              id:e.SignupId

            }

            const propsChat = { 
              carrierId : e.SignupId,
              userType : "Administrador"
              }


            const Pagar = (propss) =>{
              if(propss.amount !== 0){
              navigation.navigate('Mercadopago',propss)
              }
            }
            
            return (
              <View  style={
                 
                    
                e.status === true || e.status === false
                  ? styles.viewUsers
                  : styles.viewUsers2
              } key={index}>
                {console.log( "PROPS AMUNT",propss.amount)}
                <Image source={{
                  uri:
                    e.carrier.photo === null || e.carrier.photo === "url"
                      ? "https://www.radiotruck.sk/wp-content/uploads/2021/05/cropped-logo-radio-truckmale-1.png"
                      : e.carrier.photo

                }} style={e.status === true || e.status === false ? styles.imgOn : styles.imgOff} />
                <View style={styles.cardsText}>
                  <Text style={styles.cardsName}>
                    {e.carrier.name} {e.carrier.lastName}
                  </Text>
                  <Text style={styles.cardsSubtitle}>{e.carrier.eMail}</Text>
                  <Text style={styles.cardsSubtitle2}>Saldo = ${propss.amount||0}</Text>
                  <View style={styles.flexbtn}>
                  <TouchableOpacity style={styles.btnText} onPress={() => navigation.navigate("Chat", propsChat) } >
                    <Icon name='chatbox-ellipses-outline' style={styles.icon} size={hp('3.5%')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnText} onPress={() => navigation.navigate("AdmTravelOn", e.SignupId)}>
                    <Icon name='navigate-outline' style={styles.icon} size={hp('3.5%')} />
                    </TouchableOpacity>                   
                    <TouchableOpacity style={styles.btnText} onPress={()=>Pagar(propss)}>
                    <Icon name='card-outline' style={styles.icon} size={hp('3.5%')} />
                    </TouchableOpacity>                                
                    <TouchableOpacity style={styles.btnText} onPress={() => navigation.navigate('AdmHistoryCarrier', e.SignupId)} >
                      <Icon name='newspaper-outline' style={styles.icon} size={hp('3.5%')} />
                    </TouchableOpacity>
                    
                    </View>
                  
                </View>
              </View>
            );
          }) : (<View style={{ alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: hp('2%'), fontWeight: '400' }}>No hay transportistas disponibles</Text>
          </View>)
        }

      </View>

    )
  }

  /// --> INICIO DEL COMPONENTE <-- ///
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom:hp("-2%")}}>
        <HeaderBar screen={"ProfileAdmin"} />
        </View>
        <View style={styles.containerHeaders}>
          <View style={{ flexDirection: 'row', marginBottom:hp("-2.6%") }}>
            <Text style={{ fontSize: hp("2.8%"), fontWeight: "bold", marginTop:hp("2%") }}>
              Controla tu Flota
            </Text>
            <Icon name='stats-chart-outline' style={styles.iconn} size={hp('2.8%')} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NewCarrier')} >
            <View style={{ flexDirection: 'row', alignSelf:"flex-end", marginTop:hp("-2%"), marginRight:wp("4%") }}>
              <Icon name='person-add-outline' style={styles.iconAdd} size={hp('4.5%')} />
            </View>
          </TouchableOpacity>

        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>CON UN VIAJE EN CURSO</Text>
        </View>

        <View style={styles.containerCards}>
          <View style={styles.cards}>
            <View style={styles.insideCard}>
              {
                user ? CarrierContainer(user.Ocupados) : <ActivityIndicator size="large" color="#0000ff" />
              }

            </View>
          </View>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>DISPONIBLE</Text>
        </View>
        <View >
          <View style={styles.containerCards}>
            <View style={styles.cards}>
              <View style={styles.insideCard}>
                {
                  user ? CarrierContainer(user.Disponibles) : <ActivityIndicator size="large" color="#0000ff" />
                }
              </View>
            </View>
          </View>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>FUERA DE SERVICIO</Text>
        </View>
        <View >
          <View style={styles.containerCards}>
            <View style={styles.cards}>
              <View style={styles.insideCard}>
                {
                  user ? CarrierContainer(user.Fuera_de_servicio) : <ActivityIndicator size="large" color="#0000ff" />
                }
              </View>
            </View>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent
          visible={modalView}
        >
                <ModalAlert
                text={'El usuario no tiene un viaje en curso'}
                setModal={SetModalView}
                />
        </Modal>
      </ScrollView>
    </View>
  );
};

export default HistorialDeViaje;

const styles = StyleSheet.create({
  flexbtn: {
    display:"flex",
    flexDirection: 'row',
    // margin: wp('0.5%'),
    marginTop:hp("1%"),
    marginBottom:hp("-1%"),
    width:wp("80%"),
    alignContent:"space-between",
    marginLeft:wp("-7%")
  },
  iconn: {
    marginLeft: hp('1%'),
    marginTop:hp("2.2%")

  },
  iconAdd: {
    marginRight: hp('1%'),
    color: '#ff1c02',
   
  },
  imgOn: {
    width: hp('12%'),
    height: wp('23%'),
    borderRadius: hp('10%'),
    borderColor: '#49B145',
    borderWidth: wp('0.8%')
  },
  imgOff: {
    width: hp('13%'),
    height: hp('13%'),
    borderRadius: hp('2%'),
    borderColor: '#808080',
    borderWidth: wp('0.8%')
  },
  containerCards: {
    flex: 1,
    width: wp("95%"),
    marginHorizontal: wp("2.5%"),
    marginTop: wp("1%"),
    paddingBottom: wp("2.75%"),
  },
  containerHeaders: {
    flex: 1,
    marginLeft: wp("5%"),
    paddingBottom: wp("2%"),
  },
  btnEditar: {
    backgroundColor: "#FFC107",
    borderRadius: wp("2%"),
    width: wp("30%"),
    height: hp("4%"),
  },

  textHistorial: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  textViajes: {
    fontSize: hp("1.75%"),
    color: '#ff1c02'
  },
  viewAnterior: {
    padding: wp("2%"),
    backgroundColor: "#DDDDDD", //"#FFC107",
    width: wp("95%"),
    marginLeft: wp("2%"),
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    borderColor: "#DDDDDD",
    borderBottomWidth: wp("0.55%"),
    borderTopWidth: wp("0.55%"),
  },
  textAnterior: {
    fontSize: hp("1.60%"),
    marginLeft: wp("2%"),
    fontWeight: "bold",
  },
  cards: {
    backgroundColor: "#F6F6F6",
    borderRadius: wp("3%"),
  },
  insideCard: {
    width: wp("91%"),
    padding: wp("4%"),
  },
  burbujaChat: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    width: wp("88%"),
  },
  textVerViaje: {
    color: 'black',
    fontWeight: "bold",
    fontSize: hp('2%'),
    textAlign: 'center',
    marginTop: wp('1%')
  },
  insideCard1: {
    width: wp("91%"),
    padding: wp("1.15%"),
    flexDirection: "row",
  },
  price: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  textFinished: {
    color: "red",
    fontWeight: "bold",
  },
  textAling: {
    flexDirection: "row",
  },
  viewUsers: {
    flexDirection: 'row',
    padding: wp("4%"),
    backgroundColor: "lightgrey", //"#FFC107",
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    marginLeft:wp("-1.7%"),
    borderColor:"green",
    width: wp('90%'),
    borderWidth: hp('0.35%'),
    shadowOpacity: 80,
    // shadowColor:"black",
    elevation: 20,
    borderRadius: wp('2.5%')
  },
  viewUsers2: {
    flexDirection: 'row',
    padding: wp("4%"),
    backgroundColor: "lightgrey", //"#FFC107",
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    marginLeft:wp("-1.7%"),
    borderColor: "red",
    width: wp('90%'),
    borderWidth: hp('0.35%'),
    shadowOpacity: 5,
    shadowColor:"red",
    elevation: 15,
    borderRadius: wp('2.5%')
  },
  cardsName: {
    fontSize: hp('2.8%'),
    fontWeight:"bold"
  },
  cardsSubtitle: {
    fontSize: hp('1.8%'),
    color: '#808080'
  },
  cardsSubtitle2: {
    fontSize: hp('2.5%'),
    marginTop:hp("0.5%")
  },
  cardsText: {
    position: "relative",
    marginLeft: wp('5%')
  },
  btnText: {
    // padding: wp("2%"),
    backgroundColor: "whitesmoke", //"#FFC107",
    // marginTop: wp("1%"),
    width: wp('10%'),
    height:wp('10%'),
    // shadowOpacity: 80,
    elevation: 15,
    marginLeft: wp("5%"),
    justifyContent:"center",
    alignItems:"center",
    borderRadius:wp("5%"),
    borderWidth:2
  },

});

/*container: { flex: 1 },
  textWrapper: {
    height: hp('70%'), // 70% of height device screen
    width: wp('80%')   // 80% of width device screen
  },
  myText: {
    fontSize: hp('5%') // End result looks like the provided UI mockup
  }
});*/
