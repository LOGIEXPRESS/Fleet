import { View, Text } from 'react-native'
import React , {useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { getTravels } from '../../Redux/actions'



export default function HistoryCarrier() {

    const travels = useSelector((store) => store.travels)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTravels())
        console.log("ESTOS SON LOS TRAVELS EN HYSTOYCARRIER",travels);
    }, [])
    
  return (
    <View>
      <Text>HistoryCarrier</Text>
    </View>
  )
}