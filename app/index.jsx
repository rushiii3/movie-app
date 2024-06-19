import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAssets } from "expo-asset";
import { LinearGradient } from "expo-linear-gradient";
import { hp, wp } from "../common/common";
import Animated, { FadeInDown } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function Page() {
  const [assets] = useAssets([require("../assets/Netflix_Series.jpeg")]);
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* "https://i.pinimg.com/736x/df/b9/cb/dfb9cbff37218eaf4c6959de8803e838.jpg" */}
      <StatusBar hidden />
      {assets && (
        <Image
          source={{ uri: assets[0].uri }}
          style={styles.bgImg}
          resizeMode="cover"
        />
      )}
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "black", "black"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 40,
            paddingHorizontal: 25,
            gap: 20,
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              fontSize: hp(7),
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            MeshFlix
          </Animated.Text>
          <Text
            style={{
              color: "white",
              marginBottom: 30,
              fontSize: 22,
              textAlign: "center",
            }}
          >
            Watch unlimited movies,{"\n"}
            series & TV shows{"\n"}
            anytime anywhere and anyway{" "}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: wp(90),
              paddingVertical: 15,
              borderRadius: 15,
            }}
            onPress={()=>{
              router.push({pathname:"(tabs)/home"})
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bgImg: {
    height: hp(100),
    width: wp(100),
    position: "absolute",
  },
  gradient: {
    height: hp(60),
    width: wp(100),
    position: "absolute",
    bottom: 0,
  },
});
