import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { hp } from "../../common/common";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import SamllCards from "../../components/SamllCards";
import useBookmarkStore from "../../store/useBookmarkStore";
const Page = () => {
  const { bookmarks, loadBookmarks } = useBookmarkStore();
  useEffect(() => {
    loadBookmarks();
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 16,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 35,
          marginBottom: 15,
        }}
      >
        Your Watch Later
      </Text>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={bookmarks}
        numColumns={2}
        automaticallyAdjustContentInsets={true}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          paddingTop: 10,
        }}
        renderItem={({ item, index }) => (
          <SamllCards item={item} type={item.type} index={index} />
        )}
        estimatedItemSize={20}
        ListEmptyComponent={
          <View
            style={{
              height: hp(70),
              backgroundColor: "black",
              width: "100%",
              marginTop: 10,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: "white",
                textAlign: "center",
              }}
            >
              Your bookmarked list is empty!
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "200",
                color: "white",
                textAlign: "center",
              }}
            >
              Start adding your favorites to revisit later.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Page;
