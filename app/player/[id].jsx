import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the play icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import VideoPlayer from "react-native-video-controls";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { hp, wp } from "../../common/common";
import { LinearGradient } from "expo-linear-gradient";
const mode = [
  { name: "none", icon: <FontAwesome name="expand" size={23} color="white" /> },
  {
    name: "contain",
    icon: <MaterialCommunityIcons name="fullscreen" size={23} color="white" />,
  },
  {
    name: "cover",
    icon: <AntDesign name="arrowsalt" size={23} color="white" />,
  },
  {
    name: "stretch",
    icon: <MaterialIcons name="aspect-ratio" size={23} color="white" />,
  },
];

const Player = () => {
  const router = useRouter();
  const { id, backdrop } = useLocalSearchParams();

  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    setOrientation();
  }, []);
  const videoPlayer = React.useRef(null);
  const [isFullscreen, setisFullscreen] = useState(false);
  const [showCustomOverlay, setShowCustomOverlay] = useState(true);
  const [isPlaying, setisPlaying] = useState(false);
  const [currentMode, setCurrentMode] = useState(0);
  const [name, setName] = useState(mode[currentMode].name);
  const [finalURL, setFinalURL] = useState(null);
  const [sourcesAvailable, setSourcesAvailable] = useState(true);

  const { data: playerData } = useQuery({
    queryKey: ["player" + id],
    queryFn: async () => {
      const response = await axios.get(
        `https://videosrc.vercel.app/vidsrc/${id}`
      );
      return response.data;
    },
  });
  useEffect(() => {
    if (playerData) {
      if (Object.keys(playerData.sources).length !== 0) {
        console.log(playerData.sources);
        const vidplayStreamObject = playerData.sources.find(
          (stream) => stream?.name === "Vidplay"
        );
        const vidplayStream = vidplayStreamObject?.data?.stream;
  
        if (vidplayStream) {
          fetchStreamData(vidplayStream);
        }
      }else{
        setSourcesAvailable(false);
      }
      
    }
  }, [playerData]);

  const fetchStreamData = async (vidplayStream) => {
    try {
      const { data: streamURLS } = await axios.get(vidplayStream);
      const parsedStream = parseM3U8(streamURLS);
      const firstParsedUrl = parsedStream[0]?.url;

      if (firstParsedUrl) {
        const baseUrl = vidplayStream.split("list")[0];
        const finalURL = `${baseUrl}${firstParsedUrl}`;
        setFinalURL(finalURL);
      } else {
        console.error("No parsed URL found");
      }
    } catch (error) {
      console.error("Error fetching stream data:", error);
    }
  };

  const parseM3U8 = (content) => {
    const lines = content.split("\n");
    const streams = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXT-X-STREAM-INF")) {
        const bandwidthMatch = lines[i].match(/BANDWIDTH=(\d+)/);
        const resolutionMatch = lines[i].match(/RESOLUTION=(\d+x\d+)/);
        const url = lines[i + 1];

        if (bandwidthMatch && resolutionMatch && url) {
          streams.push({
            bandwidth: parseInt(bandwidthMatch[1], 10),
            resolution: resolutionMatch[1],
            url,
          });
        }
      }
    }

    return streams;
  };

  if (!finalURL) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w1280${backdrop}` }}
          style={{ height: "100%", width: "100%" }}
        />
        {!sourcesAvailable && (
          <>
                <LinearGradient
        // Background Linear Gradient
        colors={[
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.8)",
        ]}
        style={{
          height: wp(100),
          width: hp(100),
          position: "absolute",
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      />
            <Text
              style={{
                color: "red",
                fontSize: 20,
                fontWeight: "bold",
                position: "absolute",
                top: "45%",
                left: "20%",
              }}
            >
              Sorry, we can't play this video as the URL is not present.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                top: "52%",
                left: "40%",
                position: "absolute",
                paddingHorizontal: 26,
                paddingVertical: 15,
                borderRadius: 15,
              }}
              onPress={router.back}
            >
              <Text style={{ fontWeight: "800", fontSize: 20 }}>Go Back</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
  const handleOnLoad = (loadData) => {
    console.log("Media loaded:", loadData);
  };
  const handleBack = () => {
    router.back();
  };
  const handleTextTracksChanged = (data) => {
    console.log("Text tracks changed:", data);
    const selectedTextTrack = data.selectedTextTrack;
    setSelectedTrack(selectedTextTrack); // Update the selected track state
  };
  const videoData = {
    description: "BigBugBunny sideLoaded subtitles",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    textTracks: [],
  };
  const handleHideControls = () => {
    setShowCustomOverlay(false);
  };
  const handleShowControls = () => {
    setShowCustomOverlay(true);
  };
  const handleForward10 = () => {
    if (videoPlayer.current) {
      videoPlayer?.current?.player.ref.seek(
        videoPlayer?.current.state.currentTime + 10
      ); // Seek to the new time
    }
  };
  const handleBackward10 = () => {
    if (videoPlayer.current) {
      const currentTime = videoPlayer?.current.state.currentTime; // Get the current playback time
      const newTime = Math.max(0, currentTime - 10); // Backward by 10 seconds, ensuring not to go negative
      videoPlayer?.current?.player.ref.seek(newTime); // Seek to the new time
    }
  };
  const handlePlayToggle = () => {
    setisPlaying(!isPlaying);
  };
  const handleChangeMode = () => {
    const nextModeIndex = (currentMode + 1) % mode.length; // Calculate the index of the next mode
    const nextMode = mode[nextModeIndex].name; // Get the name of the next mode
    setCurrentMode(nextModeIndex); // Update the current mode index
    setName(nextMode); // Update the name of the mode

    // Update the resizeMode state
    if (videoPlayer.current) {
      console.log(nextMode);
      console.log(videoPlayer.current.player.ref.props.resizeMode);
      videoPlayer.current.player.ref.setNativeProps({ resizeMode: nextMode });
    }
  };

  const renderCustomOverlay = () => {
    return (
      <>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            left: "41%",
            top: "40%",
          }}
        >
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleBackward10}
          >
            <MaterialIcons name="replay-10" size={36} color="white" />
          </TouchableOpacity>

          {isPlaying ? (
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handlePlayToggle}
            >
              <Ionicons name="pause-circle-outline" size={48} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handlePlayToggle}
            >
              <Ionicons name="play-circle-outline" size={48} color="white" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleForward10}
          >
            <MaterialIcons name="forward-10" size={36} color="white" />
          </TouchableOpacity>
        </View>
        {/* <View style={{ position: "absolute", bottom:10, left:20 }}>
          <TouchableOpacity style={[styles.controlButton,{alignItems:'center',justifyContent:'center',gap:2}]} onPress={handleChangeMode}>
            {mode[currentMode].icon}
            <Text style={{color:'white'}}>
            {mode[currentMode].name}
            </Text>
          </TouchableOpacity>
        </View> */}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1 }}>
        <VideoPlayer
          source={{
            uri: finalURL,
          }}
          ref={videoPlayer}
          fullscreen={isFullscreen}
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
            backBufferDurationMs: 120000,
            cacheSizeMB: 200,
          }}
          fullscreenAutorotate={true}
          onError={this.error} // Callback when video cannot be loaded
          style={{
            backgroundColor: "black",
            ...StyleSheet.absoluteFill,
            elevation: 1,
          }}
          playInBackground={true}
          fullscreenOrientation="landscape"
          allowsExternalPlayback={true}
          pictureInPicture={true}
          onLoad={handleOnLoad}
          onPlaybackStatusUpdate={(newStatus) => setStatus(newStatus)}
          poster={`https://image.tmdb.org/t/p/w1280${backdrop}`}
          posterResizeMode="cover"
          preventsDisplaySleepDuringVideoPlayback={true}
          toggleResizeModeOnFullscreen={false}
          onEnterFullscreen={() => {
            setisFullscreen(true);
          }}
          onExitFullscreen={() => {
            setisFullscreen(false);
          }}
          textTracks={videoData.textTracks}
          selectedTextTrack={{
            type: "index",
            value: 0,
          }}
          resizeMode="contain"
          captionsVisible={true}
          onTextTracksChanged={handleTextTracksChanged} // Handle text tracks change event
          disableFullscreen={true}
          onHideControls={handleHideControls}
          onShowControls={handleShowControls}
          paused={!isPlaying}
          showNotificationContorols={true}
          title={"Oppenheimer"}
          disablePlayPause={true}
          onBack={handleBack}
          onLoadStart={(data) => {
            console.log(data);
          }}
        />
      </View>
      {showCustomOverlay && renderCustomOverlay()}
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
export default Player;
