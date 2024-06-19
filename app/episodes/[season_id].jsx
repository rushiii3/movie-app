import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "../../hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
const Page = () => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
  const router = useRouter();
  const { season_id, name, showid } = useLocalSearchParams();
  const { data: episodes } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}/season/${season_id}?language=en-US`,
    key: showid + season_id + "episode",
  });
  const render = ({ item, index }) => {
    return (
      <Animated.View entering={FadeInDown.duration(600).delay(200*index)} style={styles.productCard}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w1280${item.still_path}`,
          }}
          transition={1000}
          style={styles.productImage}
          contentFit="cover"
          cachePolicy={"memory-disk"}
          placeholder={blurhash}
          placeholderContentFit="cover"
        />

        <View style={styles.productInfo}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                marginBottom: 4,
                color: "white",
              }}
            >
              Episode {item?.episode_number}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                marginBottom: 4,
                color: "#4caf50",
              }}
            >
              {item?.runtime} min
            </Text>
          </View>

          <Text style={styles.productName}>{item?.name}</Text>
          {/* <Text style={styles.productDescription}>{item?.overview}</Text> */}
          <View
            style={{
              marginTop: "auto",
              flexDirection: "row",
              gap: 20,
              justifyContent: "space-between",
              paddingRight: 15,
            }}
          >
            <TouchableOpacity onPress={() => {
          router.push({ pathname: "/player/[id]", params:{
            "id":`${showid}?s=${season_id}&e=${item?.episode_number}`,
            "backdrop":item.still_path
          } });
        }}>
              <FontAwesome5 name="play" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Octicons name="download" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };
  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <FlashList
          data={episodes?.episodes}
          renderItem={render}
          estimatedItemSize={Dimensions.get("window").height}
          contentContainerStyle={{
            backgroundColor: "black",
            paddingHorizontal: 20,
            paddingTop: 5,
          }} // Adjust padding as needed
          contentInsetAdjustmentBehavior="always"
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "white",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 20,
  },
  productImage: {
    width: 190,
    height: 120,
    marginRight: 16,
    borderRadius: 15,
  },
  productInfo: {
    flex: 1,
    marginTop: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
    textAlign: "left",
  },
});

export default Page;
