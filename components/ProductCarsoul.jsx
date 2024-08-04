import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const ProductCarsoul = (props,{item}) => {
    
  const [selectedProdct, setSelectedProdct] = useState(item)
  return (
    <View>
      <Text>{props.selectedProdct.name}</Text>
    </View>
  )
}

export default ProductCarsoul

const styles = StyleSheet.create({})