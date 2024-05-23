import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
const SamllCards = ({ item, type, index }) => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
  const router = useRouter();
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(200*index)} style={{flex:1}}>
      <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "column",
        margin: 6,
        borderRadius: 15,
      }}
      onPress={() => {
        if (type === "movie") {
          router.push({
            pathname: "/movie/[movieid]",
            params: {
              movieid: item?.id,
            },
          });
        } else {
          router.push({
            pathname: "/shows/[showid]",
            params: {
              showid: item?.id,
            },
          });
        }
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
        }}
        transition={1000}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 270,
          borderRadius: 15,
        }}
        contentFit="cover"
        cachePolicy={"memory-disk"}
        placeholder={blurhash}
        placeholderContentFit="cover"
      />
    </TouchableOpacity>
    </Animated.View>
  );
};

export default SamllCards;
