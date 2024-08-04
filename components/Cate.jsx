import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontSize, spacing } from '../constants/dimension'
import { colors } from '../constants/colors'
import { catagory } from '../data/category'
import { useState } from 'react'
const Cate = ({selectedCate, handelCateegory}) => {
    
    // const handelSelectCate =(catagory)=>{
    //     handelCateegory(catagory)
    // }
    return (
        <FlatList 
        data={catagory} 
        renderItem={({item,index}) => (
            <TouchableOpacity 
            onPress={()=>{
                handelCateegory(item.name)
            }}>
                <Text style={[
                    styles.txt,
                    selectedCate===item.name && {color:colors.purple}]}>
                    {item.name}
                </Text>
                {/* js ko select kya jaeyga us pr hi line rahegi */}
                {
                    selectedCate ===item.name&&  <View style={styles.ulline} />
                }
                
            </TouchableOpacity>
        )} 
        keyExtractor={(item)=>item.id}
        horizontal
        ItemSeparatorComponent={
            <View style={{paddingHorizontal:spacing.sm}} />
        }
        showsHorizontalScrollIndicator={false}
        />
    )
}

export default Cate

const styles = StyleSheet.create({
    txt: {
        fontSize: fontSize.md,
        color: colors.grey

    },
    ulline: {
        borderBottomColor: colors.purple,
        borderBottomWidth: 2,
        width: "50%",
        marginTop: spacing.sm

    }
})