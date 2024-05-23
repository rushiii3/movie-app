import { View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { hp } from "../../common/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TitleTagline from "../../components/Sections/TitleTagline";
import Genre from "../../components/Sections/Genre";
import Overview from "../../components/Sections/Overview";
import WatchDownload from "../../components/Sections/WatchDownload";
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
import Bookmark from "../../assets/svg/Bookmark";
import useBookmarkStore from "../../store/useBookmarkStore";
import BookmarkFill from "../../assets/svg/BookmarFill";
import ModalComponent from "../../components/ModalComponent";
const Page = () => {
  const { bookmarks, addBookmark, removeBookmark, loadBookmarks } = useBookmarkStore();
  const { movieid } = useLocalSearchParams();
  console.log(movieid);
  useEffect(() => {
    loadBookmarks();
  }, []);
  const { data: moviedata } = useFetch({
    endpoint: `https://api.themoviedb.org/3/movie/${movieid}`,
    key: movieid + "movie",
  });
  const { data: cast } = useFetch({
    endpoint: `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`,
    key: movieid + "cast",
  });
  const { data: teasers } = useFetch({
    endpoint: `https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,
    key: movieid + "teasers",
  });
  const { data: recommendations } = useFetch({
    endpoint: `https://api.themoviedb.org/3/movie/${movieid}/recommendations?language=en-US&page=1`,
    key: movieid + "recommendations",
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
      id:movieid,
      poster_path:moviedata?.poster_path,
      type:"movie"
    }
    addBookmark(Bookmarks)
  }
  const checkBookmark = bookmarks?.find(b => b?.id === movieid);
  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      ref={scrollViewRef}
      scrollEventThrottle={16}
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            !checkBookmark ? (<TouchableOpacity
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
            </TouchableOpacity>) : (<TouchableOpacity
              onPress={() => removeBookmark(movieid)}
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
            </TouchableOpacity>)
            
          ),
        }}
      />
      
      <StatusBar style="light" />
      <ModalComponent />
      <View style={{ paddingBottom: insets.bottom }}>
        <Header
          scrollToDiv={scrollToDiv}
          scrollOffset={scrollOffset}
          backdrop={moviedata?.backdrop_path}
          poster={moviedata?.poster_path}
          isAdult={moviedata?.adult}
        />
        <View style={{ marginTop: hp(12), flex: 1, paddingHorizontal: 20 }}>
          {/* title and subtitle */}
          <TitleTagline
            title={
              moviedata?.title ? moviedata?.title : moviedata?.original_title
            }
            tagline={moviedata?.tagline}
          />
          {/* genres */}
          <Genre data={moviedata?.genres} />
          {/* duration and length */}
          <ShortInfo
            duration={moviedata?.runtime}
            languages={moviedata?.spoken_languages}
            release_date={moviedata?.release_date}
          />
          {/* overview */}
          <Overview data={moviedata?.overview} />
          {/* watch and download now */}
          <WatchDownload id={movieid}  backdrop={moviedata?.backdrop_path}  />
          {/* cast */}
          <Cast data={cast?.cast} />
          {/* Videos & Trailers */}
          <VideoTrailer data={teasersData ? teasersData : sample} />
          {/*  Recommendations */}
          {recommendations?.results.length !== 0 && (
            <Recommendation
              data={
                recommendations?.results ? recommendations?.results : sample
              }
              type={"movie"}
            />
          )}
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default Page;
