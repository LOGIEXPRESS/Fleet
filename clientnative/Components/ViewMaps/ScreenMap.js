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

const { width, height } = Dimensions.get("window");
const CARD_HEIGTH = 380;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


export default function ScreenMap() {

  const dispatch= useDispatch()

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
    })();
    dispatch(getTravels());
    console.log("ESTO SON LOS VIAJES", travels[0]);
  }, []);

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
          const { orig } = travels[index]?.travel;
          const origen = orig.split("/");
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
      {pin.latitude !== 0 ? (
        <MapView
          style={StyleSheet.absoluteFill}
          ref={_map}
          initialRegion={pin}
          provider="google"
        > 
          <Marker
          coordinate={pin}
          />
         {/*  <View style={{ marginTop: 35, position: "absolute" }}></View> */}

        

        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
   {/*    {travels?.length !==0 ?(
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
            )}
            >
              {
                travels?.map((data,index)=>{

                  let origen=data.orig
                  let destino=data.destination

                  return(
                    <View style={styles.card} key={index}>
                      <View style={{ alignItems: "center", flexDirection: "column" }}>
                        <Image

                          source={{
                            uri:
                              "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg"
                          }}
                          style={styles.cardImage}
                        
                        
                        />
                        <StarRating ratings={rating} reviews={rating} />
                               

                      </View> 
                      <View style={styles.textContent}>
                        <Text>Pago: {data.price}</Text>  
                        <Text>Origen: {origen}</Text>
                        <Text>Destino: {destino}</Text>

                      </View>

                    </View>
                  )

                })
              }
            

            </Animated.ScrollView>
           
          ):(
            <ActivityIndicator size="large" color="#0000ff" />
          )} */}
    </View>
)};


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
