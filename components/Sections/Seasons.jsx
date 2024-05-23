import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
const Seasons = ({ data, showid }) => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
    const router = useRouter();
  return (
    <View style={{ marginVertical: 15, gap: 15 }}>
      <View>
        <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
          Seasons
        </Text>
      </View>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        contentContainerStyle={{ columnGap: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({ pathname: "/episodes/[season_id]", params:{
                "season_id" : item?.season_number,
                "name" : item?.name,
                "showid" : showid
              }  });
            }}
          >
            <View style={{ width: 130 }}>
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
                    uri: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
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
                {item.name}
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
                Episodes {item.episode_count}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Seasons;
