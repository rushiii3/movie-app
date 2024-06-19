import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { hp } from "../common/common";
const m3u8Content = `
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=4500000,RESOLUTION=1920x1080
e4/edbb;15a38634f803584ba8926411d7bee906856cab0654b5bc.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1800000,RESOLUTION=1280x720
e3/edbb;15a38634f803584ba8926411d7bee906856cab0654b5bc.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=720000,RESOLUTION=640x360
e1/edbb;15a38634f803584ba8926411d7bee906856cab0654b5bc.m3u8
`;

const parseM3U8 = (content) => {
  const lines = content.split('\n');
  const streams = [];
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#EXT-X-STREAM-INF')) {
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

const formatLabel = (resolution, bandwidth) => {
  let label = `${resolution} (${(bandwidth / 1000)} kbps)`;

  switch (resolution) {
    case '640x360':
      label = '480p (SD): Standard Definition';
      break;
    case '1280x720':
      label = '720p (HD): High Definition';
      break;
    case '1920x1080':
      label = '1080p (Full HD): Full High Definition';
      break;
    case '2560x1440':
      label = '1440p (2K): 2K resolution';
      break;
    case '3840x2160':
      label = '2160p (4K): 4K Ultra High Definition';
      break;
    default:
      break;
  }
  return label;
};

const ModalComponent = () => {
  const streams = parseM3U8(m3u8Content);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isVisible, setisVisible] = useState(true);
  useEffect(() => {
    if (streams.length > 0) {
      setSelectedLanguage(streams[0].url); // Default to the first stream
    }
  }, [streams]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      statusBarTranslucent={true}
      style={{ backgroundColor: "black" }}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose your quality</Text>
          <Pressable
            onPress={() => {
              setisVisible(false);
            }}
          >
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
            style={{ width: "100%", placeholderTextColor: "white" }}
            itemStyle={{ color: "white", fontSize: 17, fontWeight: "900" }}
          >
            {streams.map((stream, index) => (
          <Picker.Item
            key={index}
            label={formatLabel(stream.resolution, stream.bandwidth)}
            value={stream.url}
          />
        ))}
          </Picker>
          <TouchableOpacity
            onPress={() => {
             console.log(selectedLanguage);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                paddingVertical: hp(1.2),
                paddingHorizontal: 16,
                borderWidth: 1,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 24,
                  fontWeight: "700",
                  color: "#000",
                }}
              >
                Done
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalContent: {
    height: "40%",
    width: "100%",
    backgroundColor: "black",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
