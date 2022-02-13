import { View, Text } from 'react-native'
import React , {useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { alltravelstruck } from '../../Redux/actions'



export default function HistoryCarrier() {

    const alltraveltruck = useSelector((store) => store.alltraveltruck)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(alltravelstruck("456c9bee-ddc6-4b83-a7b4-ad3ac6f3eb97"))
        console.log("ESTOS SON LOS TRAVELS EN HYSTOYCARRIER",alltraveltruck);
    }, [])
    
  return (
    <View>
      <Text>HistoryCarrier</Text>
    </View>
  )
}