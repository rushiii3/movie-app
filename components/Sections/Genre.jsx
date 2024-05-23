import { View, Text, FlatList } from "react-native";
import React from "react";

const Genre = ({ data }) => {
  return (
    <View style={{ marginVertical: 15, flex: 1, alignItems: "center" }}>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        contentContainerStyle={{ columnGap: 15 }}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <Text style={{ color: "white", fontWeight: "500" }}>
              {item.name}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Genre;
