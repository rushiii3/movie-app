import {
  View,
  Text,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { hp, wp } from "../../common/common";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
const Header = ({ scrollOffset, backdrop, poster, isAdult }) => {
  const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";
  const IMG_HEIGHT = hp(55);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, 0],
            [-IMG_HEIGHT, 0, 0]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  console.log();
  return (
    <View>
      <Animated.Image
        source={{
          uri: `https://image.tmdb.org/t/p/w1280${backdrop}`,
        }}
        transition={1000}
        style={[{ height: hp(55), width: wp(100) }, imageAnimatedStyle]}
        contentFit="cover"
        cachePolicy={"memory-disk"}
        placeholder={blurhash}
        placeholderContentFit="cover"
      />
      {/* <TouchableOpacity
        style={{
          position: "absolute",
          top: hp(20),
          left: "32%",
          zIndex: 1,

          borderWidth: 1,
          height: hp(5),
          width: wp(35),
          borderColor: "white",
          borderRadius: 50,
          overflow: "hidden",
        }}
        onPress={scrollToDiv}
      >
        <BlurView
          intensity={50}
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: "center",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <AntDesign name="playcircleo" size={24} color="white" />
          <Text style={{ color: "white", fontWeight: "600" }}>
            Watch Trailer
          </Text>
        </BlurView>
      </TouchableOpacity> */}
      <LinearGradient
        // Background Linear Gradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,0.7)",
        ]}
        style={{
          height: hp(40),
          width: wp(100),
          position: "absolute",
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w1280${poster}`,
        }}
        transition={1000}
        style={{
          width: wp(50),
          height: hp(35),
          borderRadius: 15,
          position: "absolute",
          top: hp(30),
          left: "25%",
        }}
        contentFit="cover"
        cachePolicy={"memory-disk"}
        placeholder={blurhash}
        placeholderContentFit="cover"
      />
      {isAdult && (
        <View
          style={{
            position: "absolute",
            top: hp(60),
            right: wp(18),
            gap: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "red",
              justifyContent: "center",
              borderRadius: 50,
              height: hp(6),
              width: wp(14),
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              18+
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
