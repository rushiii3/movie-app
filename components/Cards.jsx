import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { hp, wp } from "../common/common";
import Animated, { FadeInRight, FadeOutLeft,ZoomIn } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Image } from 'expo-image';
const Cards = ({ path, index, type, id }) => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M"
  const router = useRouter();
  return (
    <Animated.View exiting={FadeOutLeft.duration(600).delay(100*index)} entering={FadeInRight.duration(600).delay(200*index)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (type === "movie") {
            router.push({
              pathname: "/movie/[movieid]",
              params: {
                movieid: id,
              },
            });
          } else {
            router.push({
              pathname: "/shows/[showid]",
              params: {
                showid: id,
              },
            });
          }
        }}
      >
        <Image
          // sharedTransitionTag={path}
          source={{
            uri: `https://image.tmdb.org/t/p/w1280${path}`,
          }}
          transition={1000}
          style={styles.image}
          contentFit="cover"
          cachePolicy={"memory-disk"}
          placeholder={blurhash}
          placeholderContentFit="cover"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    borderRadius: 15,
    width: wp(50),
    height: hp(35),
    alignItems: "center",
    position: "relative",
    marginHorizontal: 10,
  },
  image: {
    flex: 1,
    width: wp(50),
    height: hp(35),
    borderRadius: 15,
  },
});
export default Cards;
