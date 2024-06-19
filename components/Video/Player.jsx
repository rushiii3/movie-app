import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "react-native-video";
import Subtitles from "react-native-subtitles";
import Animated from "react-native-reanimated";
import * as DropdownMenu from "zeego/dropdown-menu";
import {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import { BlurView } from "expo-blur";

import {
  Ionicons,
  SimpleLineIcons,
  Fontisto,
  FontAwesome6,
} from "@expo/vector-icons";

import CoverIcon from "../../assets/svg/CoverIcon";
import ContainIcon from "../../assets/svg/ContainIcon";
import { hp, wp } from "../../common/common";
import { useAssets } from "expo-asset";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import LinearGradient from "react-native-linear-gradient";
import { useRouter } from "expo-router";
function convertDurationToHMS(durationInSeconds) {
  var hours = Math.floor(durationInSeconds / 3600);
  var minutes = Math.floor((durationInSeconds % 3600) / 60);
  var seconds = Math.floor(durationInSeconds % 60);
  var formattedHours = hours > 0 ? hours : "";
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  var formattedDuration =
    formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

  formattedDuration = formattedDuration.replace(/^0+:/, "");
  formattedDuration = formattedDuration.replace(/^[^0-9]*/, "");

  return formattedDuration;
}

const formatLabel = (resolution, bandwidth) => {
  let label = `${resolution} (${(bandwidth / 1000)} kbps)`;

  switch (resolution) {
    case '640x360':
      label = '480p (SD)';
      break;
    case '1280x720':
      label = '720p (HD)';
      break;
    case '1920x1080':
      label = '1080p (Full HD)';
      break;
    case '2560x1440':
      label = '1440p (2K)';
      break;
    case '3840x2160':
      label = '2160p (4K)';
      break;
    default:
      break;
  }
  return label;
};
const Player = ({
  isLoading,
  error,
  finalURL,
  backdrop,
  Subtitle,
  Streams,
}) => {
  console.log(Streams);

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const Halfwidth = Dimensions.get("screen").width / 2;
  const videoRef = useRef(null);
  const [assets] = useAssets([require("../../assets/broadchurch.mp4")]);
  const [Volume, setVolume] = useState(1);
  const [mode, setmode] = useState("contain");
  const [isPlaying, setisPlaying] = useState(false);
  const [duration, setduration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [Progress, setProgress] = useState(0);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(0);
  const volumeProgress = useSharedValue(1);
  const volumeMin = useSharedValue(0);
  const volumeMax = useSharedValue(1);
  const controlsOpacity = useSharedValue(1);
  const [SelectedSubtitle, setSelectedSubtitle] = useState(null);

  // useEffect(() => {
  //   const englishSub = Subtitle?.find(
  //     (value) => value.lang === "English" || value.lang === "english"
  //   );
  //   setSelectedSubtitle(englishSub);
  // }, []);

  const handleBack = () => {
    router.back();
  };
  const togglePlayPause = () => {
    setisPlaying(!isPlaying);
  };

  const handleEndVideo = () => {
    setisPlaying(false);
    setTimeout(() => {
      videoRef.current.seek(0);
      setProgress(0);
    }, 10);
  };

  const handleOnLoad = (data) => {
    console.log(data);
    console.log("loaded");
    setduration(data.duration);
    max.value = withSpring(data.duration);
  };

  const handleProgress = (data) => {
    setProgress(data.currentTime);
    progress.value = withSpring(data.currentTime);
  };

  const handleSlidingComplete = (data) => {
    videoRef.current.seek(data);
  };

  const handleBackward = () => {
    videoRef.current.seek(progress.value - 10);
  };

  const handleForward = () => {
    videoRef.current.seek(progress.value + 10);
  };

  const handleDoubleTap = (event) => {
    const touchX = event.absoluteX;
    if (Halfwidth < touchX) {
      videoRef.current.seek(progress.value + 10);
    } else {
      videoRef.current.seek(progress.value - 10);
    }
  };

  const handleSingleTap = () => {
    setShowControls((prev) => !prev);
  };

  useEffect(() => {
    controlsOpacity.value = withTiming(showControls ? 1 : 0, { duration: 400 });
  }, [showControls]);

  const singleTap = Gesture.Tap().onStart(() => {
    runOnJS(handleSingleTap)();
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      runOnJS(handleDoubleTap)(event);
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });
  const handleLoadStart = (data) => {
    console.log("load started");
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* finalURL && Subtitle !== null */}
      {finalURL && Subtitle !== null ? (
        <>
          <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
            <View style={{ flex: 1 }}>
              <VideoPlayer
                ref={videoRef}
                onLoadStart={handleLoadStart}
                onLoad={handleOnLoad}
                source={{
                  uri: finalURL,
                }}
                bufferConfig={{
                  minBufferMs: 15000,
                  maxBufferMs: 50000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                  backBufferDurationMs: 120000,
                  cacheSizeMB: 0,
                  live: {
                    targetOffsetMs: 500,
                  },
                }}
                onEnd={handleEndVideo}
                paused={!isPlaying}
                showNotificationContorols={true}
                resizeMode={mode}
                onProgress={handleProgress}
                volume={Volume}
                style={{
                  backgroundColor: "black",
                  ...StyleSheet.absoluteFill,
                  elevation: 1,
                }}
                pictureInPicture={true}
                playWhenInactive
                playInBackground={false}
                onPictureInPictureStatusChanged={({ isActive }) => {
                  console.log(isActive, "isActive");
                }}
              />
              {SelectedSubtitle !== null && (
                <View
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Subtitles
                    currentTime={progress.value}
                    selectedsubtitle={{
                      file: SelectedSubtitle?.file,
                    }}
                  />
                </View>
              )}
            </View>
          </GestureDetector>
          {/* controls */}
          <>
            {/* top controls */}
            <Animated.View
              style={[
                {
                  flex: 1,
                  position: "absolute",
                  top: 2,
                  width: "100%",
                  paddingTop: insets.top,
                  paddingLeft: insets.left,
                  paddingRight: insets.right,
                  paddingBottom: insets.bottom,
                },
                animatedStyles,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    marginTop: 10,
                  }}
                >
                  <BlurView intensity={90} tint="dark">
                    <View
                      style={{
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 30,
                      }}
                    >
                      <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="close" size={30} color="white" />
                      </TouchableOpacity>
                      {mode === "cover" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setmode("contain");
                          }}
                        >
                          <CoverIcon height={30} width={30} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setmode("cover");
                          }}
                        >
                          <ContainIcon height={30} width={30} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </BlurView>
                </View>

                <View>
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 15,
                      maxWidth: wp(45),
                      textAlign: "center",
                    }}
                  >
                    Stranger Things {"\n"}
                    S1 E1
                  </Text>
                </View>
                <View style={{ borderRadius: 10, overflow: "hidden" }}>
                  <BlurView intensity={90} tint="dark">
                    <View
                      style={{
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        width: "100%",
                      }}
                    >
                      <View style={customStyles8.container}>
                        <Slider
                          progress={volumeProgress}
                          minimumValue={volumeMin}
                          maximumValue={volumeMax}
                          theme={{
                            disableMinTrackTintColor: "#fff",
                            maximumTrackTintColor: "#65605f",
                            minimumTrackTintColor: "#fff",
                            cacheTrackTintColor: "#333",
                            bubbleBackgroundColor: "#666",
                            heartbeatColor: "#999",
                          }}
                          onValueChange={(value) => {
                            setVolume(value);
                            console.log(value);
                          }}
                        />
                      </View>

                      {(volumeProgress.value === 0 ||
                        volumeProgress.value < 0) && (
                        <SimpleLineIcons
                          name="volume-off"
                          size={24}
                          color="white"
                        />
                      )}
                      {volumeProgress.value > 0.5 && (
                        <SimpleLineIcons
                          name="volume-2"
                          size={24}
                          color="white"
                        />
                      )}
                      {volumeProgress.value <= 0.5 &&
                        volumeProgress.value > 0 && (
                          <SimpleLineIcons
                            name="volume-1"
                            size={24}
                            color="white"
                          />
                        )}
                    </View>
                  </BlurView>
                </View>
              </View>
            </Animated.View>
            {/* bottom controls */}
            <Animated.View
              style={[
                {
                  flex: 1,
                  position: "absolute",
                  bottom: 5,
                  width: "100%",
                  paddingTop: insets.top,
                  paddingLeft: insets.left,
                  paddingRight: insets.right,
                  paddingBottom: insets.bottom,
                },
                animatedStyles,
              ]}
            >
              <View style={{ borderRadius: 10, overflow: "hidden", flex: 1 }}>
                <BlurView
                  intensity={90}
                  tint="dark"
                  style={{ borderRadius: 10 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        width: wp(10),
                      }}
                    >
                      <TouchableOpacity onPress={handleBackward}>
                        <Fontisto name="backward" size={20} color="white" />
                      </TouchableOpacity>

                      {isPlaying ? (
                        <TouchableOpacity
                          onPress={togglePlayPause}
                          style={{ marginHorizontal: "auto" }}
                        >
                          <FontAwesome6 name="pause" size={25} color="white" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={togglePlayPause}
                          style={{ marginHorizontal: "auto" }}
                        >
                          <FontAwesome6 name="play" size={25} color="white" />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity onPress={handleForward}>
                        <Fontisto name="forward" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        {convertDurationToHMS(Progress)
                          ? convertDurationToHMS(Progress)
                          : "00:00"}
                      </Text>
                      <View
                        style={{
                          width: wp(100),
                        }}
                      >
                        <Slider
                          progress={progress}
                          minimumValue={min}
                          maximumValue={max}
                          bubbleContainerStyle={{
                            zIndex: 100,
                            position: "absolute",
                          }}
                          onSlidingComplete={handleSlidingComplete}
                          theme={{
                            disableMinTrackTintColor: "#fff",
                            maximumTrackTintColor: "#65605f",
                            minimumTrackTintColor: "#fff",
                            cacheTrackTintColor: "#333",
                            bubbleBackgroundColor: "#666",
                            heartbeatColor: "#999",
                          }}
                        />
                      </View>
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        -{convertDurationToHMS(duration)}
                      </Text>
                    </View>
                    <View>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <TouchableOpacity>
                            <Fontisto
                              name="player-settings"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                          <DropdownMenu.Group key={"mainmenu"}>
                            <DropdownMenu.Sub key={"subs"}>
                              <DropdownMenu.SubTrigger key="subTrigger">
                                Subtitlesss
                              </DropdownMenu.SubTrigger>
                              <DropdownMenu.SubContent key={"subContent"}>
                                {Subtitle?.map((value, key) => (
                                  <DropdownMenu.CheckboxItem
                                    value={
                                      value.lang === SelectedSubtitle?.lang
                                        ? "on"
                                        : "off"
                                    }
                                    onValueChange={(next, previous) => {
                                      setSelectedSubtitle(value);
                                    }}
                                    key={key + "subtitle"}
                                  >
                                    <DropdownMenu.ItemTitle>
                                      {value?.lang}
                                    </DropdownMenu.ItemTitle>

                                    <DropdownMenu.ItemIndicator></DropdownMenu.ItemIndicator>
                                  </DropdownMenu.CheckboxItem>
                                ))}
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                            <DropdownMenu.Sub key={"quality"}>
                              <DropdownMenu.SubTrigger key="qualityTrigger">
                                Quality
                              </DropdownMenu.SubTrigger>
                              <DropdownMenu.SubContent key={"qualityContent"}>
                                {Streams?.map((value, key) => (
                                  <DropdownMenu.CheckboxItem
                                    // value={value?.lang===SelectedSubtitle?.lang?"on":"off"}
                                    onValueChange={(next, previous) => {
                                      // setSelectedSubtitle(value);
                                    }}
                                    key={key + "quality"}
                                  >
                                    <DropdownMenu.ItemTitle>
                                      {formatLabel(value?.resolution,value?.bandwidth)}
                                    </DropdownMenu.ItemTitle>

                                    <DropdownMenu.ItemIndicator></DropdownMenu.ItemIndicator>
                                  </DropdownMenu.CheckboxItem>
                                ))}
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                          </DropdownMenu.Group>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </View>
                  </View>
                </BlurView>
              </View>
            </Animated.View>
          </>
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w1280${backdrop}`,
              // uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s",
            }}
            style={{ height: "100%", width: "100%" }}
          />
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
          {isLoading && (
            <ActivityIndicator
              style={{
                position: "absolute",
                zIndex: 2,
                top: "45%",
                left: "47%",
              }}
              size={30}
              color={"white"}
            />
          )}

          {error && (
            <>
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
      )}
    </GestureHandlerRootView>
  );
};

export default Player;

const styles = StyleSheet.create({
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
});

var customStyles8 = StyleSheet.create({
  container: {
    width: wp(25),
  },
  track: {
    height: 5,
    backgroundColor: "#37332f",
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 10 / 2,
    shadowColor: "#31a4db",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
});
