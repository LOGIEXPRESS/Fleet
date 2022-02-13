import { View, Text } from 'react-native'
import React , {useEffect, useState} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { alltravelstruck, enviarToken } from '../../Redux/actions'
import * as SecureStore from "expo-secure-store";


export default function HistoryCarrier() {

    const responlog = useSelector((store) => store.responseLog)
    const  travelstruck = useSelector((store) => store.alltravelstruck)
    
    const dispatch = useDispatch();

    const [idUser , setIdUser] = useState("")

    useEffect(() => {
        setIdUser(responlog.id)
        console.log("ESTO es responlog BOOOMMMM", responlog.id);
        
        
    }, [])

    useEffect(() => {
      console.log("idUser",idUser)
      dispatch(alltravelstruck(idUser))
      console.log("AQUI",travelstruck)
  }, [dispatch])

    
  return (
    <View>
      <Text>HistoryCarrier</Text>
    </View>
  )
}