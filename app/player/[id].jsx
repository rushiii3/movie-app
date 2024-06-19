import React, {useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { useLocalSearchParams, useRouter } from "expo-router";
import Player from "../../components/Video/Player";
import useFetchVideoData from '../../hooks/useFetchVideoData';

const Page = () => {
  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    setOrientation();
  }, []);
   const { id, backdrop } = useLocalSearchParams();
   const { finalURL, error, isLoading,  Streams, Subtitle } = useFetchVideoData(id);
   return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1 }}>
        <Player isLoading={isLoading} error={error} finalURL={finalURL} backdrop={backdrop} Subtitle={Subtitle} Streams={Streams}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  overlay: {
    position: "absolute",
    left: (Dimensions.get("window").width - 108) / 2,
    top: (Dimensions.get("window").height - 36) / 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  controlButton: {
    padding: 10,
  },
});


export default Page;
