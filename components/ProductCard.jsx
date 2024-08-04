import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../constants/colors'
import { fontSize, spacing } from '../constants/dimension'
import Ionicons from "@expo/vector-icons/Ionicons"
import Entypo from "@expo/vector-icons/Entypo"
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather'

// const imgurl = "https://en-pk.svestonwatches.com/cdn/shop/files/Nitro_Cam002_V4_78aa0751-d553-4aaa-86a4-e02d8dd721ec_1800x1800.webp?v=1719580799"

const ProductCard = ({ item }) => {

  const [showModal, setShowModal] = useState(false)
  const [selectedProdct, setSelectedProdct] = useState(item)
  // const navigation =useNavigation()
  // const handelProductDetailScreen =()=>{
  //   navigation.navigate()
  // }
  const modal = (item) => {
    setShowModal(true)
    setSelectedProdct(item)
  }
  return (<>
    <TouchableOpacity style={styles.main}
      onPress={() => modal(item)}>
      <View style={styles.imgwrp} >
        <Image source={{ uri: item.img }} style={styles.prdimg} />
      </View>
      {/* Name and Price */}
      <View style={styles.nameprice}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>{item.price}</Text>

      </View>
    </TouchableOpacity>
    <Modal visible={showModal} animationType="slide">
      <ModalProduct setShowModal={setShowModal} selectedProdct={selectedProdct}
        images={selectedProdct.images} />
    </Modal>
  </>
  )
}

const ModalProduct = (props) => {
  const screenWidth = Dimensions.get("window").width
  const [activeSlide, setActiveSlide] = useState(0)
  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems.length > 0) {
      setActiveSlide(viewableItems.viewableItems[0].index)
    }
  })
  const colorData = [
    {
      colorName: "Silver",
      colorValue: "silver"
    },
    {
      colorName: "Orange",
      colorValue: "orange"
    },
    {
      colorName: "Black",
      colorValue: "black"
    },
  ]
  const [selectedColor, setSelectedColor] = useState("")
  const [selectTab, setSelectTab] = useState("Details")

  // console.warn(selectedColor)
  // console.warn(props.selectedProdct)
  return (
    <View style={{ flex: 1, backgroundColor: "white", }}>
      <ScrollView style={{ padding: spacing.sm }}
      showsVerticalScrollIndicator={false}>
        {/* Back and Heart Button */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.setShowModal(false)}>
            <Ionicons name={"arrow-back"} size={30} style={{ padding: 0 }} />
          </TouchableOpacity>
          <Ionicons name={"heart"} size={30}  color={"red"}/>
        </View>
        {/* Flat List of Pics */}
        <View style={{ padding: 1, backgroundColor: "white", }}>
          <FlatList

            keyExtractor={(item, index) => index}
            data={props.selectedProdct.images}
            showsHorizontalScrollIndicator={false}
            horizontal
            onViewableItemsChanged={onViewRef.current}
            pagingEnabled={true}
            snapToAlignment="center"
            snapToInterval={screenWidth}
            decelerationRate={"fast"}
            style={{ width: Dimensions.get("window") }}
            renderItem={({ item }) => {
              return (
                <View >
                  <Image source={{ uri: item }} style={{ height: 350, width: screenWidth }} />
                </View>)
            }}
          />
        </View>
        {/* Color Dots in list */}
        <View style={styles.dot}>
          {
            props.selectedProdct.images.map((_, index) => (
              <View
                // key={index.id}
                style={[styles.dot2,
                index === activeSlide && {
                  width: 20, borderRadius: 32
                },
                {
                  backgroundColor: index === activeSlide ? colors.purple : colors.grey
                }
                ]} />
            ))}
        </View>

        {/* Titles  */}
        <View style={styles.titlecont}>
          <View style={styles.titlewrp}>
            <Text style={styles.prdcname}>{props.selectedProdct.name}</Text>
            <Text style={styles.prdcbrnd}>{props.selectedProdct.brand}</Text>
            <Text style={{ fontSize: 20, color: "purple" }}>{props.selectedProdct.price}</Text>
          </View>
          <View style={styles.rating}>
            <Entypo name="star" size={24} color={"yellow"} />
            <Text style={{ fontSize: 18 }}>4.5</Text>
          </View>
        </View>

        {/* Color List */}
        <View style={styles.colorcont}>
          <Text style={styles.colorheading}>Colors</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ width: spacing.sm }} />)}
            data={colorData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.selcolorcont,
                item.colorValue === selectedColor && {
                  borderColor: colors.purple
                }
                ]}
                onPress={() => { setSelectedColor(item.colorValue) }}>
                <View style={[styles.circle,
                {
                  backgroundColor: item.colorValue,

                }
                ]} />
                <Text style={styles.colorText}>{item.colorName}</Text>
              </TouchableOpacity>
            )} />
        </View>
        {/* Detail & Review */}
        <View style={styles.detailReviwTab}>
          <TouchableOpacity onPress={() => {
            setSelectTab("Details")
          }}>
            <Text style={[styles.tabText,
            selectTab == "Details" &&
            {
              color: "purple"
            }
            ]}>Details</Text>
            {
              selectTab === "Details" && <View style={styles.underl} />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setSelectTab("Review")
          }}>
            <Text style={[styles.tabText,
            selectTab == "Review" &&
            {
              color: "purple"
            }
            ]}>Review</Text>
            {
              selectTab === "Review" && <View style={styles.underl} />
            }

          </TouchableOpacity>
        </View>
        {/* Content View */}
        <Text style={{
          color: "grey",
          fontSize: fontSize.md,
          paddingVertical: spacing.xs,
          paddingBottom: 100
        }}>
          {
            selectTab === "Details" ? props.selectedProdct.detail : props.selectedProdct.review}
        </Text>

      </ScrollView>
      {/* ADd to CartBotton Gradient */}

      <TouchableOpacity style={{justifyContent:"center",alignItems:"center",paddingVertical:spacing.sm}}>
        <LinearGradient colors={['#8743FF', '#4136F1']}
        style={{width:"90%",padding:12,justifyContent:"center",alignItems:"center",
          borderRadius:10, flexDirection:"row",gap:spacing.md
        }}
        start={{
          x:0,
          y:0.5
        }}
        end={{
          x:1,
          y:0
        }}>
          <Feather name='shopping-cart' size={20} color={"white"} />
          <Text style={{color:"white",fontSize:fontSize.md}}>
            Add to Cart
          </Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  main: {
    width: "48%",
    // height:160,
    elevation: 5,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginVertical: spacing.md
  },
  imgwrp: {
    borderRadius: 20,
    backgroundColor: "white",//#FFC8B7
    margin: spacing.sm
  },
  prdimg: {
    height: 150,
    resizeMode: "center",
  },
  nameprice: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md

  },
  name: {
    color: "black",
    fontSize: fontSize.md

  },
  price: {
    color: colors.purple,
    fontSize: fontSize.md

  },
  brand: {
    color: colors.grey,
    fontSize: fontSize.md,
    paddingVertical: spacing.xs
  },
  dot: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: spacing.xs,
  },
  dot2: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginHorizontal: spacing.xs,
    backgroundColor: colors.grey
  },
  titlecont: {
    flexDirection: "row"
  },
  titlewrp: {
    flex: 1
  },
  prdcname: {
    color: "black",
    fontWeight: "bold",
    fontSize: fontSize.lg
  },
  prdcbrnd: {
    color: "grey",
    fontSize: 14,
    paddingVertical: spacing.sm
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#dddddb",
    borderRadius: spacing.md,
    padding: spacing.sm,
    height: 40,
    marginTop: spacing.md

  },
  colorcont: {
    paddingTop: spacing.xs
  },
  colorheading: {
    fontSize: fontSize.md,
    color: "black",
    fontWeight: "500",
    paddingBottom: spacing.md
  },
  selcolorcont: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 4,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    height: spacing.md,
    width: spacing.md,
    backgroundColor: "purple",
    borderRadius: spacing.md / 2
  },
  colorText: {
    // fontSize:fontSize.sm,
    color: "black"
  },
  detailReviwTab: {
    flexDirection: "row",
    paddingTop: spacing.xs,
    gap: spacing.lg
  },
  tabText: {
    fontSize: fontSize.md,
    color: colors.grey,
  },
  underl: {
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    width: "50%",
    marginTop: spacing.xs

  }
})