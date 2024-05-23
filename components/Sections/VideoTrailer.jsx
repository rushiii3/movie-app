import { View, Text } from "react-native";
import React, { useRef } from "react";
import { FlashList } from "@shopify/flash-list";
import YoutubePlayer from "react-native-youtube-iframe";
const VideoTrailer = ({ data }) => {
  const playerRef = useRef(null);

  const render = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 15,
          overflow: "hidden",
          marginHorizontal: 10,
        }}
      >
        {item?.key ? (
          <YoutubePlayer
            ref={playerRef}
            height={220}
            width={385}
            videoId={item.key}
            play={false}
            onChangeState={(event) => console.log(event)}
            onReady={() => console.log("ready")}
            onError={(e) => console.log(e)}
            onPlaybackQualityChange={(q) => console.log(q)}
            playbackRate={1}
          />
        ) : (
          <View style={{height:220,width:385}} />
        )
      
      }
      </View>
    );
  };
  return (
    <View style={{ marginVertical: 15, gap: 15, flex: 1 }} id="trailer">
      <Text style={{ color: "white", fontSize: 25, fontWeight: "700" }}>
        Trailers
      </Text>
      <View style={{ flex: 1 }}>
        <FlashList
          data={data}
          renderItem={render}
          estimatedItemSize={1000}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          } // Ensure unique keys
        />
      </View>
    </View>
  );
};

export default VideoTrailer;
