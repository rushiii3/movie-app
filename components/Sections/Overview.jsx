import { View, Text } from "react-native";
import React from "react";

const Overview = ({data}) => {
  return (
    <View style={{ marginVertical: 15, gap: 15 }}>
      <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
        Overview
      </Text>
      <Text style={{ color: "white", textAlign: "justify" }}>
        {data}
      </Text>
    </View>
  );
};

export default Overview;
