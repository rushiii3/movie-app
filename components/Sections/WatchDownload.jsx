import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import {hp,wp} from '../../common/common'
const WatchDownload = ({id, backdrop}) => {
    const router = useRouter();
  return (
    <View style={{ marginVertical: 15, gap: 15 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: hp(5),
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          router.push({ pathname: "/player/[id]", params:{
            "id":id,
            "backdrop":backdrop
          } });
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          Watch Now
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          height: hp(5),
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 22, fontWeight: "bold" }}>
          Download Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WatchDownload;
