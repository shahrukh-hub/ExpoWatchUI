import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { fontSize, spacing } from '../constants/dimension'
import { colors } from '../constants/colors'
import Cate from '../components/Cate'
import ProductCard from '../components/ProductCard'
import { smartwatch } from "../data/smartwatch"
import { headphone } from "../data/headphones"
import { apple } from "../data/apple"
import { useState } from 'react'
import { xiaomi } from '../data/xiaomi'
import { useFonts } from 'expo-font';
import { samsung } from '../data/samsung'
export default function index() {
    const [loaded, error] = useFonts({
        'PlayfairDisplay-VariableFont_wght': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),

    });

    useEffect(() => {
        if (loaded || error) {
            //   SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    const [data, setdata] = useState(smartwatch)
    const [selectedCate, setselectedCate] = useState("Smart Watch")

    const handelCateegory = (newCategary) => {
        if (newCategary === "Smart Watch") {
            setdata(smartwatch)
        }
        else if (newCategary === "Headphones") {
            setdata(headphone)
        }
        else if (newCategary === "Apple") {
            setdata(apple)
        }
        else if (newCategary === "Xiaomi") {
            setdata(xiaomi)
        }
        else if (newCategary === "Samsung") {
            setdata(samsung)
        }
        setselectedCate(newCategary)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Find Your Favourite Watch</Text>
            <FlatList
                ListHeaderComponent={<>
                    {/* Search Field */}
                    <View style={styles.search}>
                        <View style={styles.inputwraper}>
                            <Image source={require("../assets/images/search.png")} style={styles.logo} />
                            <TextInput placeholder='Search' />
                        </View>
                        <View style={styles.category}>
                            <Image source={require("../assets/images/category.png")} style={styles.logo} />
                        </View>

                    </View>
                    <Cate selectedCate={selectedCate} handelCateegory={handelCateegory} />
                </>
                }
                data={data}
                renderItem={({ item, index }) => <ProductCard item={item} data={data} />}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{
                    paddingBottom: 200,
                    padding: spacing.md
                }}
                showsVerticalScrollIndicator={false}
            />



        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.background,
        padding: spacing.xs
    },
    txt: {
        // paddingHorizontal:25,
        color: colors.purple,
        fontSize: fontSize.xxl,
        fontFamily: "PlayfairDisplay-VariableFont_wght"
    },
    search: {
        marginVertical: spacing.lg,
        alignItems: "center",
        flexDirection: "row"

    },
    inputwraper: {
        flex: 1,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        borderColor: colors.placeholder,
        borderRadius: 40,
        paddingHorizontal: spacing.md,
    },
    logo: {
        height: 20,
        width: 20
    },
    textinput: {
        flex: 1,
        paddingHorizontal: spacing.md,
        fontSize: fontSize.md

    },
    category: {
        paddingHorizontal: spacing.sm,

    }
})