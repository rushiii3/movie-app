import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import SamllCards from "../../components/SamllCards";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { hp } from "../../common/common";
import {debounce} from 'lodash';
import useGenreStore from "../../store/useGenre";
const Header = ({ setSearchPhrase, setGenresWithSelection, genresWithSelection }) => {
  const [text, settext] = useState('');
  const [loading, setLoading] = useState(false);
  const handleGenreChange = (genreId) => {
    const updatedGenres = genresWithSelection.map((genre) => {
      if (genre.id === genreId) {
        return {
          ...genre,
          isSelected: !genre.isSelected,
        };
      } else {
        return genre;
      }
    });
    setGenresWithSelection(updatedGenres);
  };
  const handleChange = async textParam => {
    setLoading(true);
    settext(textParam);
    debounceCall(textParam);
};
const debounceCall = useCallback(
  debounce(textParam => {
    setSearchPhrase(textParam)
    setLoading(false);
    console.log(textParam);
  }, 1000),
  [],
);
  return (
    <View style={{ paddingBottom: 15 }}>
      <Text
        style={{
          color: "white",
          fontSize: hp(5),
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Movies
      </Text>
      <View style={{ position: "relative", marginBottom: 10 }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          autoFocus={false}
          onChangeText={handleChange}
          placeholder="search your movies here"
          placeholderTextColor="#6b7280"
          style={{
            height: 44,
            backgroundColor: "#f1f5f9",
            paddingHorizontal: 16,
            borderRadius: 12,
            fontSize: 15,
            fontWeight: "500",
            color: "#222",
            paddingLeft: 40,
          }}
          value={text}
        />
        {loading ? (
          <Progress.Circle
            size={24}
            indeterminate={true}
            style={{ position: "absolute", top: 10, left: 7 }}
          />
        ) : (
          <Ionicons
            name="search-outline"
            size={24}
            color="black"
            style={{ position: "absolute", top: 10, left: 7 }}
          />
        )}
        {text && (
          <TouchableOpacity
            style={{ position: "absolute", top: 12, right: 7 }}
            onPress={() => {
              setLoading(false);
              setSearchPhrase("");
              settext("");
            }}
          >
            <AntDesign name="closecircleo" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <FlashList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={genresWithSelection}
        extraData={{}}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "white",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: item.isSelected
                ? "white"
                : "rgba(255,255,255,0.2)",
              marginHorizontal: 5,
            }}
            onPress={() => {
              setLoading(true);
              handleGenreChange(item.id);
            }}
          >
            <Text
              style={{
                color: item.isSelected ? "black" : "white",
                fontWeight: "500",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        estimatedItemSize={Dimensions.get("window").width}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
const Page = () => {
  const {movieGenre} = useGenreStore();
  const insets = useSafeAreaInsets();
  const [genresWithSelection, setGenresWithSelection] = useState(
    movieGenre?.genres.map((genre) => ({ ...genre, isSelected: false }))
  );
  const [searchPhrase, setSearchPhrase] = useState("");
  

  const selectedGenres = genresWithSelection
    .filter((genre) => genre.isSelected)
    .map((genre) => genre.id)
    .join(",");

  const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["AllMovies", selectedGenres, searchPhrase],
      queryFn: async ({ pageParam = 1 }) => {
        const fetchUrl = searchPhrase 
        ? `https://api.themoviedb.org/3/search/movie?query=${searchPhrase}&language=en-US&page=${pageParam}`
        : `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageParam}${selectedGenres ? `&with_genres=${selectedGenres}` : ""}`;
        const res = await axios.get(fetchUrl, {
          headers: {
            accept: "application/json",
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
          return undefined;
        }
      },
      onSuccess: () => setLoading(false),
    });

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 16,
        paddingTop: insets.top + 10,
      }}
    >
      <StatusBar style="light" hidden={false} />
      <Header
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setGenresWithSelection={setGenresWithSelection}
        genresWithSelection={genresWithSelection}
      />
      {isLoading  ? (
        <View style={{ height: hp(60), justifyContent: "center" }}>
          <ActivityIndicator animating={true} color={"white"} />
        </View>
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          data={data?.pages.flatMap((page) => page.results) || []}
          numColumns={2}
          automaticallyAdjustContentInsets={true}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 20,
            paddingTop: 10,
          }}
          renderItem={({ item, index }) => (
            <SamllCards item={item} type={"movie"} index={index} />
          )}
          estimatedItemSize={Dimensions.get("window").height}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.6}
          ListEmptyComponent={
            <View
              style={{
                height: hp(65),
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
                {searchPhrase ? "No movies match your search." : "No movies match the selected genre."}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "200",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {searchPhrase ? "Please try different keywords." : "Please explore other genres or refine your selection."}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Page;
