import { View, Text, ActivityIndicator , FlatList , StyleSheet} from 'react-native'
import React , {useEffect, useState} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { alltravelstruck, enviarToken } from '../../Redux/actions'
import * as SecureStore from "expo-secure-store";
import CardTravel from "./CardTravel";


export default function HistoryCarrier() {
    const dispatch = useDispatch();
    const responlog = useSelector((store) => store.responseLog)
    const travelstruck = useSelector((store) => store.alltraveltruck)
    const [inProcess , setInprocess] = useState([])
    const [inFinished, setInfinished] = useState([])

    useEffect(() => {
        dispatch(alltravelstruck(responlog.id))
    }, [])

    useEffect(() => {
      setInprocess(travelstruck?.travelinprocess)
      setInfinished(travelstruck?.travelfinished)
  }, [travelstruck])

    console.log("inProcess",inProcess, "inFinished", inFinished);
    
  return (
    <View style={styles.spinner}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android"? 30 : 0,
  },
  Container:{
    borderColor: "black",
    borderWidth: 2
  },
  spinner:{
    marginTop: 20,
    marginBottom: Platform.OS === "android"? 90 : 60,
  }
})