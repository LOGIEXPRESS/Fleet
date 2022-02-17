import { View, Text, ActivityIndicator, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { alltravelstruck, enviarToken } from '../../Redux/actions'
import * as SecureStore from "expo-secure-store";
import CardTravel from "./CardTravel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from '../Utils/HeaderBar';
import Icon from "react-native-vector-icons/Ionicons";


export default function HistoryCarrier() {
  const dispatch = useDispatch();
  const responlog = useSelector((store) => store.responseLog)
  const travelstruck = useSelector((store) => store.alltraveltruck)
  const [inProcess, setInprocess] = useState([])
  const [inFinished, setInfinished] = useState([])

  useEffect(() => {
    dispatch(alltravelstruck(responlog.id))
  }, [])

  useEffect(() => {
    setInprocess(travelstruck?.travelinprocess)
    setInfinished(travelstruck?.travelfinished)
  }, [travelstruck])

  console.log("inProcess", inProcess, "inFinished", inFinished);

  return (
    /*  <View style={styles.spinner}>
       <HeaderBar screen={'null'} />
       <Text>HistoryCarrier</Text>
       <View style={styles.Container}>
         <FlatList
           data={inProcess}
           horizontal={false}
           numColumns={1}
           showsVerticalScrollIndicator={false}
           keyExtractor={() => String(Math.random())}
           renderItem={({ item }) => <CardTravel travel={item} info={"Viaje en proceso"}/>}
           contentContainerStyle={styles.flatListContentContainer}
         />
       </View>
       <View style={styles.Container}>
         <FlatList
           data={inFinished}
           horizontal={false}
           numColumns={1}
           showsVerticalScrollIndicator={false}
           keyExtractor={() => String(Math.random())}
           renderItem={({ item }) => <CardTravel travel={item} info={"Viaje finalizado"}/>}
           contentContainerStyle={styles.flatListContentContainer}
         />
       </View>
     </View> */
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar screen={"null"} />
        <View style={styles.containerHeaders}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold" }}>
              Historial de Viaje
            </Text>
            <Icon name='document-text-outline' style={styles.icon} size={hp('3.2%')} />
          </View>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>VIAJE ACTUAL</Text>
        </View>

        <View style={styles.containerCards}>
          <View style={styles.cards}>
            <View style={styles.insideCard}>
              <FlatList
                data={inProcess}
                horizontal={false}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={() => String(Math.random())}
                renderItem={({ item }) => <CardTravel travel={item} info={"Viaje en proceso"} />}
                contentContainerStyle={styles.flatListContentContainer}
              />
            </View>
          </View>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>FINALIZADOS</Text>
        </View>
        <View >
          <View style={styles.containerCards}>
            <View style={styles.cards}>
              <View style={styles.insideCard}>
                <FlatList
                  data={inFinished}
                  horizontal={false}
                  numColumns={1}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={() => String(Math.random())}
                  renderItem={({ item }) => <CardTravel travel={item} info={"Viaje finalizado"} />}
                  contentContainerStyle={styles.flatListContentContainer}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
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
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  Container: {
    borderColor: "black",
    borderWidth: 2,
    height: hp('40%')
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  }
})