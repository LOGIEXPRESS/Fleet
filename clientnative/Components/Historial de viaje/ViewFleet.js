import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
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
import { userStatus, reset } from "../../Redux/actions/index.js";



const HistorialDeViaje = () => {

  const user = useSelector((store) => store.userStatus)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStatus())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  console.log("Esto serian los users:", user)



  
  const CarrierContainer = (props) => {
    console.log("ESTO ES LO QUE LE VA A LLEGAR AL COMPONENTE", props)

  
  
    return (
      <View>
        {
          props.length !== 0 ? props.map((e, index) => {


            const propss = {
              amount : e.payment[0]?.amount,
              acesstoken: e.acesstoken

            }

            const propsChat = { 
              carrierId : e.SignupId,
              userType : "Administrador"
              }
            
            return (
              <View style={styles.viewUsers} key={index}>
                <Image
                  source={{
                    uri:
                      e.carrier.photo === null || e.carrier.photo === "url"
                        ? "https://www.radiotruck.sk/wp-content/uploads/2021/05/cropped-logo-radio-truckmale-1.png"
                        : e.carrier.photo,
                  }}
                  style={
                    e.status === true || e.status === false
                      ? styles.imgOn
                      : styles.imgOff
                  }
                />
                <View style={styles.cardsText}>
                  <Text style={styles.cardsName}>
                    {e.carrier.name} {e.carrier.lastName}
                  </Text>
                  <Text style={styles.cardsSubtitle}>{e.carrier.eMail}</Text>
                  <View style={styles.flexbtn}>
                    <TouchableOpacity style={styles.btnText}>
                      <Text style={{ fontSize: wp("2.3%") }}>
                        {" "}
                        HISTORIAL DE VIAJES{" "}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnText}
                      onPress={() => navigation.navigate("Mercadopago", propss)}
                    >
                      <Text style={{ fontSize: wp("2.3%") }}>
                        {" "}
                        SALDO GENERADO{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.flexbtn}>
                    <TouchableOpacity style={styles.btnText}>
                      <Text style={{ fontSize: wp("2.3%") }}>
                        {" "}
                        VER VIAJE ACTUAL{" "}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnText} onPress={() => navigation.navigate("Chat", propsChat) } >
                      <Text style={{ fontSize: wp("2.3%") }}>
                        {" "}
                        ENVIAR MENSAJE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }) : (<View style={{alignContent: 'center', alignItems:'center'}}>
              <Text style={{fontSize: hp('2%'), fontWeight:'400'}}>No hay transportistas disponibles</Text>
               </View>)
        }

      </View>

    )
  }

  /// --> INICIO DEL COMPONENTE <-- ///
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar screen={"null"} />
        <View style={styles.containerHeaders}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold" }}>
              Controla tu Flota
            </Text>
            <Icon name='stats-chart-outline' style={styles.icon} size={hp('2.4%')} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NewCarrier')}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textViajes}>
                Añade un nuevo transportista
              </Text>
              <Icon name='person-add-outline' style={styles.iconAdd} size={hp('2%')} />
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
      </ScrollView>
    </View>
  );
};

export default HistorialDeViaje;

const styles = StyleSheet.create({
  flexbtn: {
    flexDirection: 'row',
    margin: wp('0.5%')
  },
  icon: {
    marginLeft: hp('1%'),

  },
  iconAdd: {
    marginLeft: hp('1%'),
    color: '#ff1c02'
  },
  imgOn: {
    width: hp('12%'),
    height: wp('23%'),
    borderRadius: hp('10%'),
    borderColor: '#49B145',
    borderWidth: wp('0.8%')
  },
  imgOff: {
    width: hp('12%'),
    height: wp('23%'),
    borderRadius: hp('10%'),
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
    backgroundColor: "#EAB6AD", //"#FFC107",
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    borderColor: "#ff1c02",
    width: wp('87%'),
    borderWidth: hp('0.15%'),
    shadowOpacity: 80,
    elevation: 15,
    borderRadius: wp('4%')
  },
  cardsName: {
    fontSize: hp('2%'),
  },
  cardsSubtitle: {
    fontSize: hp('1.5%'),
    color: '#808080'
  },
  cardsText: {
    position: "relative",
    marginLeft: wp('5%')
  },
  btnText: {
    padding: wp("2%"),
    backgroundColor: "#fff", //"#FFC107",
    marginTop: wp("1%"),
    width: wp('25%'),
    shadowOpacity: 80,
    elevation: 15,
    marginRight: wp('0.6')
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
