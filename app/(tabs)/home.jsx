import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HorizontalTransaction from "../../components/HorizontalTrans";
import Feeds from "../../components/Feeds";
import useFetch from "../../hooks/useFetch";
const index = () => {
  const urls = [
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
  ];

  const insets = useSafeAreaInsets();
  const {data:nowPlayingMovies} = useFetch({endpoint:urls[0],key:"nowPlayingMovies"});
  const {data:nowPlayingShows} = useFetch({endpoint:urls[1],key:"nowPlayingShows"});
  const {data:popularMovies} = useFetch({endpoint:urls[2],key:"popularMovies"});
  const {data:popularShows} = useFetch({endpoint:urls[3],key:"popularShows"});
  const {data:topRatedMovies} = useFetch({endpoint:urls[4],key:"topRatedMovies"});
  const {data:topRatedShows} = useFetch({endpoint:urls[5],key:"topRatedShows"});

  const sample = [1, 2];
  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom + 40 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "black" }}
        automaticallyAdjustContentInsets={true}
        contentInsetAdjustmentBehavior="automatic"
      >
        <StatusBar hidden={false} style="light" />
        {/* trending */}
        <HorizontalTransaction />
        {/* now playing movies */}
        <Feeds
          title={"Now Playing Movies"}
          data={
            nowPlayingMovies?.results
              ? nowPlayingMovies?.results
              : sample
          }
          type={"movie"}
          url={urls[0]}
        />
        {/* now playing shows */}
        <Feeds
          title={"Now Playing Shows"}
          data={
            nowPlayingShows?.results
              ? nowPlayingShows.results
              : sample
          }
          type={"shows"}
          url={urls[1]}
        />
        {/* popular movies */}
        <Feeds
          title={"Popular Movies"}
          data={
            popularMovies?.results ? popularMovies.results : sample
          }
          type={"movie"}
          url={urls[2]}
        />

        {/* popular shows */}
        <Feeds
          title={"Popular Shows"}
          data={popularShows?.results ? popularShows.results : sample}
          type={"shows"}
          url={urls[3]}
        />
        {/* top rated movies */}
        <Feeds
          title={"Top Rated Movies"}
          data={
            topRatedMovies?.results ? topRatedMovies.results : sample
          }
          type={"movie"}
          url={urls[4]}
        />
        {/* top rated shows */}
        <Feeds
          title={"Top Rated Shows"}
          data={
            topRatedShows?.results ? topRatedShows.results : sample
          }
          type={"shows"}
          url={urls[5]}
        />
      </ScrollView>
    </View>
  );
};

export default index;
