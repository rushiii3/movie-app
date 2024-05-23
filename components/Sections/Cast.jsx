import { View, Text, FlatList } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
const Cast = ({ data }) => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
  const sample = [1,2];
  return (
    <View style={{ marginVertical: 15, gap: 15, flex: 1 }}>
      <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
        Cast
      </Text>
      <FlatList
        data={data?data:sample}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        renderItem={({ item }) => (
          <View style={{ width: 130, marginRight:20 }}>
            <View
              style={{
                width: "100%",
                height: 170,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri: item.profile_path
                    ? `https://image.tmdb.org/t/p/w1280${item.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg",
                }}
                transition={1000}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
                contentFit="cover"
                cachePolicy={"memory-disk"}
                placeholder={blurhash}
                placeholderContentFit="cover"
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                textAlign: "center",
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {item.name?item.name:item.original_name}
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 13,
                textAlign: "center",
                fontWeight: "300",
                marginTop: 2,
              }}
            >
              {item.character?item.character:'\n'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())} // Ensure unique keys
        estimatedItemSize={1000}
      />
    </View>
  );
};

export default Cast;
