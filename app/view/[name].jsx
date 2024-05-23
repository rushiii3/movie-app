import { View, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SamllCards from "../../components/SamllCards";
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from "axios"
const Page = () => {
  const { name, url, type } = useLocalSearchParams();
  const rename = name.split(" ").concat("Extra").join("");
  const urlNew = new URL(url);
  urlNew.searchParams.delete('page');
  const newUrlString = urlNew.toString();
  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [rename],
    queryFn: async ({ pageParam = 1 }) => {
      const fetchUrl = `${newUrlString}&page=${pageParam}`;
      const res = await axios.get(fetchUrl, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      if (lastPage.page < lastPage.total_pages) {
        return nextPage;
      } else {
        console.log('No more pages');
        return undefined;
      }
    },
  });
  
  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar hidden={false} animated />
      <Tabs.Screen options={{ headerTitle: name }} />
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          paddingHorizontal: 16,
          paddingTop: insets.top,
        }}
      >
        <FlashList
          showsVerticalScrollIndicator={false}
          data={data?.pages.flatMap(page => page.results) || []}
          numColumns={2}
          automaticallyAdjustContentInsets={true}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 20,
            paddingTop: insets.top + 30,
          }}
          renderItem={({ item, index }) => (
            <SamllCards item={item} type={type} index={index} />
          )}
          estimatedItemSize={Dimensions.get("window").height}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.6}
        />
      </View>
    </>
  );
};

export default Page;
