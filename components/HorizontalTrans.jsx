import { Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { hp, wp } from "../common/common";
import { LinearGradient } from "expo-linear-gradient";
import useFetch from "../hooks/useFetch";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import useGenreStore from "../store/useGenre";
const blurhash = "L02rs+WB00of~qM{9F%M~qM{9F%M";

const HorizontalTransaction = () => {
  const {showGenre, movieGenre} = useGenreStore();
  const router = useRouter()
  const sample = [1, 2];
  const urls = [
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    "https://api.themoviedb.org/3/genre/tv/list?language=en",
  ];
  const { data: trendings } = useFetch({ endpoint: urls[0], key: "trendings" });

  const renderItem = ({ item }) => {
    let itemGenres;
    if (item?.genre_ids) {
      if (item?.media_type === "movie") {
        itemGenres = item?.genre_ids.map((genreId) => {
          const genre = movieGenre?.genres.find(
            (genre) => genre?.id === genreId
          );
          return genre ? genre?.name : "";
        });
      } else {
        itemGenres = item?.genre_ids.map((genreId) => {
          const genre = showGenre?.genres.find(
            (genre) => genre?.id === genreId
          );
          return genre ? genre?.name : "";
        });
      }
    }

    return (
      <TouchableOpacity
        style={{
          flex: 1, // Assigning background color based on the index of the item
          borderRadius: 25,
          marginHorizontal: 20,
          position: "relative",
        }}
        onPress={() => {
          if (item?.media_type === "movie") {
            router.push({
              pathname: "/movie/[movieid]",
              params: {
                movieid: item?.id,
              },
            });
          } else {
            router.push({
              pathname: "/shows/[showid]",
              params: {
                showid: item?.id,
              },
            });
          }
        }}
      >
        <Image
          source={{
            uri: `https://www.themoviedb.org/t/p/w1280${item?.backdrop_path}`,
          }}
          transition={1000}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
            borderRadius: 25,
          }}
          contentFit="cover"
          cachePolicy={"memory-disk"}
          placeholder={blurhash}
          placeholderContentFit="cover"
        />

        <LinearGradient
          // Background Linear Gradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0.7)",
          ]}
          style={{
            height: hp(25),
            width: wp(100),
            position: "absolute",
            bottom: 0,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            bottom: 10,
            left: 10,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 25,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {item?.name ? item.name : item.title}
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: 14,
              fontWeight: "300",
              color: "white",
            }}
          >
            {itemGenres ? itemGenres.join(" | ") : ""}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View
        style={{
          marginVertical: 20,
          paddingHorizontal: 15,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Trending
        </Text>
      </View>
      <Carousel
        loop // Enables infinite looping of the carousel
        width={wp(100)} // Width of each item in the carousel
        height={hp(25)} // Height of the carousel
        data={trendings?.results ? trendings.results : sample} // Data to be rendered in the carousel
        autoPlay // Automatically starts playing the carouse
        style={{
          width: "100%",
          height: hp(25),
          alignItems: "center",
          justifyContent: "center",
        }}
        pagingEnabled
        scrollAnimationDuration={2000} // Duration of the scrolling animation// Callback function triggered when an item is snapped to
        renderItem={renderItem} // Function to render each item in the carousel
      />
    </>
  );
};

export default HorizontalTransaction;
