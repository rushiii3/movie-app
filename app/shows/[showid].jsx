import { TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { hp } from "../../common/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TitleTagline from "../../components/Sections/TitleTagline";
import Genre from "../../components/Sections/Genre";
import Overview from "../../components/Sections/Overview";
import Cast from "../../components/Sections/Cast";
import VideoTrailer from "../../components/Sections/VideoTrailer";
import Recommendation from "../../components/Sections/Recommendation";
import Header from "../../components/Sections/Header";
import ShortInfo from "../../components/Sections/ShortInfo";
import useFetch from "../../hooks/useFetch";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import Seasons from "../../components/Sections/Seasons";
import useBookmarkStore from "../../store/useBookmarkStore";
import Bookmark from "../../assets/svg/Bookmark";
import BookmarkFill from "../../assets/svg/BookmarFill";
const Page = () => {
  const { bookmarks, addBookmark, removeBookmark, loadBookmarks } =
    useBookmarkStore();
  useEffect(() => {
    loadBookmarks();
  }, []);
  const { showid } = useLocalSearchParams();
  const { data: showdata } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}?language=en-US`,
    key: showid + "movie",
  });
  const { data: cast } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}/credits?language=en-US`,
    key: showid + "cast",
  });
  const { data: teasers } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}/videos?language=en-US`,
    key: showid + "teasers",
  });
  const { data: recommendations } = useFetch({
    endpoint: `https://api.themoviedb.org/3/tv/${showid}/recommendations?language=en-US&page=1`,
    key: showid + "recommendations",
  });
  const teasersData = teasers?.results.filter(
    (value) => value?.type === "Teaser" || value?.type === "Trailer"
  );
  const scrollViewRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollViewRef);
  const scrollToDiv = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: hp(140), animated: true });
    }
  };
  const insets = useSafeAreaInsets();
  const sample = [1, 2];
  const handleBookmark = () => {
    const Bookmarks = {
      id: showid,
      poster_path: showdata?.poster_path,
      type: "show",
    };
    addBookmark(Bookmarks);
  };
  const checkBookmark = bookmarks?.find((b) => b?.id === showid);
  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      ref={scrollViewRef}
      scrollEventThrottle={16}
    >
      <Stack.Screen
        options={{
          headerRight: () =>
            !checkBookmark ? (
              <TouchableOpacity
                onPress={handleBookmark}
                style={{ marginRight: "auto" }}
              >
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 50,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bookmark height={24} width={24} color={"white"} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => removeBookmark(showid)}
                style={{ marginRight: "auto" }}
              >
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 50,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BookmarkFill height={24} width={24} color={"white"} />
                </View>
              </TouchableOpacity>
            ),
        }}
      />
      <StatusBar style="light" />
      <View style={{ paddingBottom: insets.bottom }}>
        <Header
          scrollToDiv={scrollToDiv}
          scrollOffset={scrollOffset}
          backdrop={showdata?.backdrop_path}
          poster={showdata?.poster_path}
          isAdult={showdata?.adult}
        />
        <View style={{ marginTop: hp(12), flex: 1, paddingHorizontal: 20 }}>
          {/* title and subtitle */}
          <TitleTagline
            title={showdata?.name ? showdata?.name : showdata?.original_name}
            tagline={showdata?.tagline}
          />
          {/* genres */}
          <Genre data={showdata?.genres} />
          {/* duration and length */}
          <ShortInfo
            status={showdata?.status}
            languages={showdata?.spoken_languages}
            release_date={showdata?.first_air_date}
          />
          {/* overview */}
          <Overview data={showdata?.overview} />
          {/* Seasons */}
          <Seasons data={showdata?.seasons} showid={showid} />
          {/* cast */}
          {cast?.length !== 0 || cast?.cast?.length !== 0 ? (
            <Cast data={cast?.cast ? cast?.cast : cast?.cast?.cast} />
          ) : null}
          {/* Videos & Trailers */}
          {teasersData?.length !== 0 && (
            <VideoTrailer data={teasersData ? teasersData : sample} />
          )}
          {/*  Recommendations */}
          <Recommendation
            data={recommendations?.results ? recommendations?.results : sample}
            type={"shows"}
          />
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default Page;
