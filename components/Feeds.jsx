import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import Cards from "./Cards";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { hp } from "../common/common";

const Feeds = ({title,type,data,url}) => {
    const router = useRouter();
  return (
    <>
      <View
        style={{
          marginTop: 30,
          paddingHorizontal: 15,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
          
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
         {title}
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            router.push({pathname:"/view/[name]",params:{
                "name" : title,
                "type" : type,
                "url" : url
            }})
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: "500", color: "red" }}>
            View All
          </Text>
          <Entypo name="chevron-small-right" size={23} color="red" />
        </TouchableOpacity>
      </View>
      <FlashList
        data={data}
        renderItem={({ item, index }) => <Cards path={item.poster_path} index={index} id={item.id} type={type} />}
        estimatedItemSize={Dimensions.get("window").width}
        horizontal
        contentContainerStyle={{ paddingVertical:20, backgroundColor: "black", }} // Adjust padding as needed
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Feeds;
