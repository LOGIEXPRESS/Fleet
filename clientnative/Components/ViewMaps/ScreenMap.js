import * as React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Platform,
  ActivityIndicator,
} from "react-native";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/core";

import { getTravels } from "../../Redux/actions";
import Card from "./Cards";
// import Pointers from "./Pointers";



import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
const CARD_HEIGTH = 380;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

import HeaderBar from "../Utils/HeaderBar";
import CardWaiting from "./CardWaiting";



export default function ScreenMap() {

  const dispatch = useDispatch()

  const travels = useSelector((state) => state.travels)



  const [pin, setPin] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      let origin={latitude: location.coords.latitude,longitude: location.coords.longitude}
      console.log('MY PIN: ',origin)
      dispatch(getTravels(origin.latitude,origin.longitude));
    })();
   

  }, [dispatch]);
  console.log("ESTO SON LOS VIAJES", travels);


  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= travels.length) {
        index = travels.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { destination } = travels[index];
          const origen = destination.split("/");
          const coordinate = {
            latitude: Number(origen[0]),
            longitude: Number(origen[1]),
          };
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    console.log("ESTO SON TRAVELS", mapEventData._targetInst.return.key, x);
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  console.log("ESTO ES EL PIN DE LA UBI", pin);
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const rating = 3;

  return (
    <View style={styles.container}>
      {/*  <HeaderBar screen="null" style={styles.header} /> */}
      {pin.latitude !== 0 ? (
        <View style={styles.container}>
          <MapView
            style={StyleSheet.absoluteFill}
            ref={_map}
            initialRegion={pin}
            provider="google"
          >
            <Marker
            title="Mi Ubicacion"
            coordinate={pin} 
            // description='descrpcion'
            />

            {/* {travels !== 0 ?(travels.map((point,index)=>{
              return (
                <Pointers key={index} onMarkerPress={onMarkerPress}/>
              )
            })
              
            ):
            <ActivityIndicator size="large" color="#0000ff" />
              
            } */}
            <View style={{ marginTop: 35, position: "absolute" }}></View>
            {travels !== 0 ? (
              travels?.map((point, index) => {
                const orig = point.destination.split("/");
                const lat = Number(orig[0]);
                const lon = Number(orig[1]);
                return (
                  <MapView.Marker
                    key={index}
                    title={`Trasporte de ${point.description}`}
                    description={`Peso: ${point.weight} ton Pago: $${point.price}`}
                    coordinate={{
                      latitude: lat,
                      longitude: lon,
                    }}
                    onPress={(e) => onMarkerPress(e)}
                  >
                    <Animated.View style={styles.markerWrap}>
                      <Animated.Image
                        source={require("../Utils/puntero.png")}
                        style={styles.marker}
                        resizeMode="cover"
                      />
                    </Animated.View>
                  </MapView.Marker>
                );
              })
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}





          </MapView>

          <Animated.ScrollView
            ref={_scrollView}
            horizontal
            scrollEventThrottle={1}
            showHorizontalScrollIndicator={false}
            style={styles.scrollView}
            pagingEnabled
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bot: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            contentContainerStyle={{
              paddingHorizontal:
                Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}>

            {travels?.length > 0 ? (travels?.map((data, index) => {
              return (
                <Card key={index}
                  orig={data.orig}
                  destination={data.destination}
                  price={data.price}
                  description={data.description}
                  weight={data.weight}
                  business={data.admin.business}
                  photo={data.admin.photo}
                  random={index}
                  id={data.id} />
              )
            })

            ) : <CardWaiting></CardWaiting>}

          </Animated.ScrollView>


        </View>







      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  btnEditar: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
    marginRight: 30,
  },
  textBtn: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
    marginTop: 12,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  cardImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGTH,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  header: {
    marginTop: 20,
  },
});
