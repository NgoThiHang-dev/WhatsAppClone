import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function Total(props){
    // console.log(props);
    const calculateTotal = props.getTotal;
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        setTotal(calculateTotal());
    }, [calculateTotal]);

  return (
    <View>
        <Text>Total{total}</Text>
    </View>
  );
}


