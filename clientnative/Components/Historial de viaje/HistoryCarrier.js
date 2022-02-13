import { View, Text } from 'react-native'
import React , {useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { alltravelstruck, enviarToken } from '../../Redux/actions'
import * as SecureStore from "expo-secure-store";


export default function HistoryCarrier() {

    const responlog = useSelector((store) => store.responseLog)

    
    const dispatch = useDispatch();



    useEffect(() => {
        


        console.log("ESTO es responlog BOOOMMMM", responlog);
    }, [dispatch])
    
  return (
    <View>
      <Text>HistoryCarrier</Text>
    </View>
  )
}