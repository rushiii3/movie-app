import { View, Text } from "react-native";
import React from "react";
import Cards from "../Cards";
import { FlashList } from "@shopify/flash-list";

const Recommendation = ({data, type}) => {
  return (
    <View style={{ marginVertical: 15, gap: 15 }}>
      <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
        Recommendations
      </Text>

      <FlashList
        data={data}
        renderItem={({ item, index }) => <Cards path={item.poster_path} index={index} id={item.id} type={type} />}
        estimatedItemSize={20}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Recommendation;
