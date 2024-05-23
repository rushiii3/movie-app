import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import * as Progress from "react-native-progress";
import { hp } from "../../common/common";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MovieSvg from "../../assets/svg/MovieSvg";
import SeriesSvg from "../../assets/svg/SeriesSvg";
import { useDownload } from "../../Provider/DownloadProvider";
import { StatusBar } from "expo-status-bar";
import { FlashList } from "@shopify/flash-list";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DeleteSvg from "../../assets/svg/DeleteSvg";


export default function App() {
  const insets = useSafeAreaInsets();

  const barWidth = Dimensions.get("window").width - 190;
  const {
    downloadFromUrl,
    pauseDownload,
    resumeDownload,
    deleteDownloadedFile,
    downloadAndProcessVideo, // Access your custom download function
    downloadProgress,
    downloadedUri,
    isDownloading,
  } = useDownload();
  // const m3u8Url = 'https://pdrz.v486a7dc1f0.site/_v2-eknz/12a3c523fa105800ed8c394685aeeb0b9b2ea15c07bee3f4164d7baea93ece832257df1a4b6125fcfa38c35da05dee86aad28d46d73fc4e9d4e5a27f0720afd530c715e3091fb40d12c6f4eb3816795131358a774a5f7889899fb50b9ba77ecb7947a757116ca602/h/list;15a38634f803584ba8926411d7bee906856cab0654b5bfb2.m3u8'; // Replace with your .m3u8 file URL
  const nowplayingmovies = [
    {
      adult: false,
      backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
      genre_ids: [28, 878, 12],
      id: 823464,
      original_language: "en",
      original_title: "Godzilla x Kong: The New Empire",
      overview:
        "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
      popularity: 2229.531,
      poster_path: "/nVOZuxRiBygJ3VmXc9QcDGZfHzD.jpg",
      release_date: "2024-03-27",
      title: "Godzilla x Kong: The New Empire",
      video: false,
      vote_average: 6.473,
      vote_count: 939,
    },
    {
      adult: false,
      backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      genre_ids: [878, 12],
      id: 693134,
      original_language: "en",
      original_title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
      popularity: 1753.806,
      poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      release_date: "2024-02-27",
      title: "Dune: Part Two",
      video: false,
      vote_average: 8.231,
      vote_count: 3652,
    },
    {
      adult: false,
      backdrop_path: "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
      genre_ids: [16, 28, 10751, 35, 14],
      id: 1011985,
      original_language: "en",
      original_title: "Kung Fu Panda 4",
      overview:
        "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
      popularity: 1723.801,
      poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
      release_date: "2024-03-02",
      title: "Kung Fu Panda 4",
      video: false,
      vote_average: 7.114,
      vote_count: 1506,
    },
    {
      adult: false,
      backdrop_path: "/4woSOUD0equAYzvwhWBHIJDCM88.jpg",
      genre_ids: [28, 27, 53],
      id: 1096197,
      original_language: "en",
      original_title: "No Way Up",
      overview:
        "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
      popularity: 1746.101,
      poster_path: "/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
      release_date: "2024-01-18",
      title: "No Way Up",
      video: false,
      vote_average: 6.36,
      vote_count: 588,
    },
    {
      adult: false,
      backdrop_path: "/tpiqEVTLRz2Mq7eLq5DT8jSrp71.jpg",
      genre_ids: [878, 28, 18],
      id: 934632,
      original_language: "en",
      original_title: "Rebel Moon - Part Two: The Scargiver",
      overview:
        "The rebels gear up for battle against the ruthless forces of the Motherworld as unbreakable bonds are forged, heroes emerge — and legends are made.",
      popularity: 1558.065,
      poster_path: "/cxevDYdeFkiixRShbObdwAHBZry.jpg",
      release_date: "2024-04-19",
      title: "Rebel Moon - Part Two: The Scargiver",
      video: false,
      vote_average: 6.106,
      vote_count: 660,
    },
    {
      adult: false,
      backdrop_path: "/5Eip60UDiPLASyKjmHPMruggTc4.jpg",
      genre_ids: [27, 9648, 53],
      id: 1041613,
      original_language: "en",
      original_title: "Immaculate",
      overview:
        "An American nun embarks on a new journey when she joins a remote convent in the Italian countryside. However, her warm welcome quickly turns into a living nightmare when she discovers her new home harbours a sinister secret and unspeakable horrors.",
      popularity: 1300.38,
      poster_path: "/fdZpvODTX5wwkD0ikZNaClE4AoW.jpg",
      release_date: "2024-03-20",
      title: "Immaculate",
      video: false,
      vote_average: 6.3,
      vote_count: 385,
    },
    {
      adult: false,
      backdrop_path: "/v5XyXZe8FADw8iHupB4L7QOAwH9.jpg",
      genre_ids: [16, 35, 10751],
      id: 748783,
      original_language: "en",
      original_title: "The Garfield Movie",
      overview:
        "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
      popularity: 1091.629,
      poster_path: "/zK2sFxZcelHJRPVr242rxy5VK4T.jpg",
      release_date: "2024-04-30",
      title: "The Garfield Movie",
      video: false,
      vote_average: 6.4,
      vote_count: 31,
    },
    {
      adult: false,
      backdrop_path: "/AuTfo1lbE8s2Y8RVTmlbJAeLWPK.jpg",
      genre_ids: [28, 53],
      id: 850888,
      original_language: "es",
      original_title: "Sayen: La cazadora",
      overview:
        "The action-packed thriller follows the journey of Sayen, a Mapuche woman who uncovers a dangerous conspiracy led by an international corporation that is destroying her family's land and ravaging the local ecosystems throughout Chile, and takes it upon herself to bring these people to justice and save her family's legacy.",
      popularity: 877.516,
      poster_path: "/upKD8UbH8vQ798aMWgwMxV8t4yk.jpg",
      release_date: "2024-04-26",
      title: "Sayen: The Huntress",
      video: false,
      vote_average: 6.5,
      vote_count: 17,
    },
    {
      adult: false,
      backdrop_path: "/fypydCipcWDKDTTCoPucBsdGYXW.jpg",
      genre_ids: [878, 12, 28],
      id: 653346,
      original_language: "en",
      original_title: "Kingdom of the Planet of the Apes",
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      popularity: 990.656,
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      release_date: "2024-05-08",
      title: "Kingdom of the Planet of the Apes",
      video: false,
      vote_average: 6.767,
      vote_count: 15,
    },
    {
      adult: false,
      backdrop_path: "/vTlK3chwsEToSoQJYUcJaHlNhIf.jpg",
      genre_ids: [18, 12],
      id: 618588,
      original_language: "en",
      original_title: "Arthur the King",
      overview:
        "Over the course of ten days and 435 miles, an unbreakable bond is forged between pro adventure racer Michael Light and a scrappy street dog companion dubbed Arthur. As the team is pushed to their outer limits of endurance in the race, Arthur redefines what victory, loyalty and friendship truly mean.",
      popularity: 808.939,
      poster_path: "/gxVcBc4VM0kAg9wX4HVg6KJHG46.jpg",
      release_date: "2024-03-15",
      title: "Arthur the King",
      video: false,
      vote_average: 6.8,
      vote_count: 102,
    },
    {
      adult: false,
      backdrop_path: "/fUC5VsQcU3m6zmYMD96R7RqPuMn.jpg",
      genre_ids: [28, 80, 53],
      id: 1105407,
      original_language: "en",
      original_title: "Damaged",
      overview:
        "A Chicago detective travels to Scotland after an emerging serial killer’s crimes match those that he investigated five years earlier, one of which was the crime scene of his murdered girlfriend.",
      popularity: 800.898,
      poster_path: "/eacWm6jPrjkpqhi4VzwqYeJWL6k.jpg",
      release_date: "2024-04-12",
      title: "Damaged",
      video: false,
      vote_average: 4.8,
      vote_count: 76,
    },
    {
      adult: false,
      backdrop_path: "/2KGxQFV9Wp1MshPBf8BuqWUgVAz.jpg",
      genre_ids: [16, 28, 12, 35, 10751],
      id: 940551,
      original_language: "en",
      original_title: "Migration",
      overview:
        "After a migrating duck family alights on their pond with thrilling tales of far-flung places, the Mallard family embarks on a family road trip, from New England, to New York City, to tropical Jamaica.",
      popularity: 882.885,
      poster_path: "/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
      release_date: "2023-12-06",
      title: "Migration",
      video: false,
      vote_average: 7.481,
      vote_count: 1293,
    },
    {
      adult: false,
      backdrop_path: "/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg",
      genre_ids: [28, 14],
      id: 634492,
      original_language: "en",
      original_title: "Madame Web",
      overview:
        "Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.",
      popularity: 821.317,
      poster_path: "/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
      release_date: "2024-02-14",
      title: "Madame Web",
      video: false,
      vote_average: 5.613,
      vote_count: 1219,
    },
    {
      adult: false,
      backdrop_path: "/k0ucFBBgSDTXYU8fVHXJyjAuIIe.jpg",
      genre_ids: [27],
      id: 1063879,
      original_language: "fr",
      original_title: "Vermines",
      overview:
        "Residents of a rundown French apartment building battle against an army of deadly, rapidly reproducing spiders.",
      popularity: 837.471,
      poster_path: "/dY98PkUAbIGUUg0FhXEcOkbzHIZ.jpg",
      release_date: "2023-12-27",
      title: "Infested",
      video: false,
      vote_average: 7.027,
      vote_count: 164,
    },
    {
      adult: false,
      backdrop_path: "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
      genre_ids: [18, 36],
      id: 872585,
      original_language: "en",
      original_title: "Oppenheimer",
      overview:
        "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
      popularity: 716.725,
      poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      release_date: "2023-07-19",
      title: "Oppenheimer",
      video: false,
      vote_average: 8.104,
      vote_count: 7911,
    },
    {
      adult: false,
      backdrop_path: "/9wJO4MBzkqgUZemLTGEsgUbYyP6.jpg",
      genre_ids: [878, 9648, 53],
      id: 720321,
      original_language: "en",
      original_title: "Breathe",
      overview:
        "Air-supply is scarce in the near future, forcing a mother and daughter to fight for survival when two strangers arrive desperate for an oxygenated haven.",
      popularity: 728.916,
      poster_path: "/wTW2t8ocWDlHns8I7vQxuqkyK58.jpg",
      release_date: "2024-04-04",
      title: "Breathe",
      video: false,
      vote_average: 5.024,
      vote_count: 63,
    },
    {
      adult: false,
      backdrop_path: "/uv2twFGMk2qBdyJBJAVcrpRtSa9.jpg",
      genre_ids: [10752, 28, 18],
      id: 929590,
      original_language: "en",
      original_title: "Civil War",
      overview:
        "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
      popularity: 592.01,
      poster_path: "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
      release_date: "2024-04-10",
      title: "Civil War",
      video: false,
      vote_average: 7.414,
      vote_count: 591,
    },
    {
      adult: false,
      backdrop_path: "/tBmJCH9llj1Q9jDOS7vGWnl7GVj.jpg",
      genre_ids: [16, 878, 28],
      id: 1209288,
      original_language: "en",
      original_title: "Justice League: Crisis on Infinite Earths Part Two",
      overview:
        "An endless army of shadow demons bent on the destruction of all reality swarms over our world and all parallel Earths! The only thing opposing them is the mightiest team of metahumans ever assembled. But not even the combined power of Superman, Batman, Wonder Woman, Green Lantern and all their fellow superheroes can slow down the onslaught of this invincible horde. What mysterious force is driving them? And how do the long-buried secrets of the Monitor and Supergirl threaten to crush our last defense?",
      popularity: 554.265,
      poster_path: "/g8ak4QAGLZpqMs3CpnFHWWfIzJQ.jpg",
      release_date: "2024-04-22",
      title: "Justice League: Crisis on Infinite Earths Part Two",
      video: false,
      vote_average: 6.4,
      vote_count: 55,
    },
    {
      adult: false,
      backdrop_path: "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",
      genre_ids: [878, 12],
      id: 438631,
      original_language: "en",
      original_title: "Dune",
      overview:
        "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
      popularity: 582.203,
      poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      release_date: "2021-09-15",
      title: "Dune",
      video: false,
      vote_average: 7.784,
      vote_count: 11503,
    },
    {
      adult: false,
      backdrop_path: "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
      genre_ids: [28, 35],
      id: 746036,
      original_language: "en",
      original_title: "The Fall Guy",
      overview:
        "Fresh off an almost career-ending accident, stuntman Colt Seavers has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.",
      popularity: 530.987,
      poster_path: "/e7olqFmzcIX5c23kX4zSmLPJi8c.jpg",
      release_date: "2024-04-24",
      title: "The Fall Guy",
      video: false,
      vote_average: 7.49,
      vote_count: 207,
    },
  ];
  const seriesss = [
    {
      adult: false,
      backdrop_path: "/hib8MpBPU7GdluS38htXCF4uw0c.jpg",
      genre_ids: [80, 18, 9648],
      id: 2734,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Law & Order: Special Victims Unit",
      overview:
        "In the criminal justice system, sexually-based offenses are considered especially heinous. In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Victims Unit. These are their stories.",
      popularity: 5766.149,
      poster_path: "/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg",
      first_air_date: "1999-09-20",
      name: "Law & Order: Special Victims Unit",
      vote_average: 7.938,
      vote_count: 3640,
    },
    {
      adult: false,
      backdrop_path: "/vcFW09U4834DyFOeRZpsx9x1D3S.jpg",
      genre_ids: [10759, 18, 10765],
      id: 57243,
      origin_country: ["GB"],
      original_language: "en",
      original_name: "Doctor Who",
      overview:
        "The Doctor is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living—more of a hobby actually, and the Doctor's very, very good at it.",
      popularity: 5498.371,
      poster_path: "/4edFyasCrkH4MKs6H4mHqlrxA6b.jpg",
      first_air_date: "2005-03-26",
      name: "Doctor Who",
      vote_average: 7.5,
      vote_count: 2871,
    },
    {
      adult: false,
      backdrop_path: "/5olSfAUqoASDsq1C7el6hYM9Kju.jpg",
      genre_ids: [35],
      id: 4556,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Scrubs",
      overview:
        'In the unreal world of Sacred Heart Hospital, John "J.D." Dorian learns the ways of medicine, friendship and life.',
      popularity: 5338.662,
      poster_path: "/u1z05trCA7AuSuDhi365grwdos1.jpg",
      first_air_date: "2001-10-02",
      name: "Scrubs",
      vote_average: 8.022,
      vote_count: 1697,
    },
    {
      adult: false,
      backdrop_path: "/2sjy8Tu8PJGFQI4Foz4682qk8Mw.jpg",
      genre_ids: [18, 9648, 80],
      id: 1620,
      origin_country: ["US"],
      original_language: "en",
      original_name: "CSI: Miami",
      overview:
        "CSI: Miami follows Crime Scene Investigators working for the Miami-Dade Police Department as they use physical evidence, similar to their Las Vegas counterparts, to solve grisly murders. The series mixes deduction, gritty subject matter, and character-driven drama in the same vein as the original series in the CSI franchise, except that the Miami CSIs are cops first, scientists second.",
      popularity: 5313.051,
      poster_path: "/pNW64pjaHvf6purNaFhq4SHYRfl.jpg",
      first_air_date: "2002-09-23",
      name: "CSI: Miami",
      vote_average: 7.736,
      vote_count: 1531,
    },
    {
      adult: false,
      backdrop_path: "/rxnschfLZf3ZPRiIa6oBBMtY7hF.jpg",
      genre_ids: [18, 10759, 80],
      id: 4376,
      origin_country: ["US"],
      original_language: "en",
      original_name: "JAG",
      overview:
        'Harmon "Harm" Rabb Jr. is a former pilot turned lawyer working for the military\'s JAG (Judge Advocate General) division, the elite legal wing of officers that prosecutes and defends those accused of military-related crimes. He works closely with Lt. Col. Sarah Mackenzie, and together they do what needs to be done to find the truth.',
      popularity: 5283.2,
      poster_path: "/zPyHpkJZ5O08lbgrQQIROXtb3xz.jpg",
      first_air_date: "1995-09-23",
      name: "JAG",
      vote_average: 7.253,
      vote_count: 324,
    },
    {
      adult: false,
      backdrop_path: "/gRhEQqSh0IfxA6Wmd1OTb5vRSHf.jpg",
      genre_ids: [10765, 10759, 18],
      id: 4604,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Smallville",
      overview:
        "The origins of the world’s greatest hero–from Krypton refugee Kal-el’s arrival on Earth through his tumultuous teen years to Clark Kent’s final steps toward embracing his destiny as the Man of Steel.",
      popularity: 5111.197,
      poster_path: "/pUhJGETy2sec4vEkiqJ9eGeIywc.jpg",
      first_air_date: "2001-10-16",
      name: "Smallville",
      vote_average: 8.226,
      vote_count: 3934,
    },
    {
      adult: false,
      backdrop_path: "/6UvUlyxNrLStWARart544iFXTWF.jpg",
      genre_ids: [80, 18, 10759],
      id: 1412,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Arrow",
      overview:
        "Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow.",
      popularity: 4700.36,
      poster_path: "/gKG5QGz5Ngf8fgWpBsWtlg5L2SF.jpg",
      first_air_date: "2012-10-10",
      name: "Arrow",
      vote_average: 6.816,
      vote_count: 5787,
    },
    {
      adult: false,
      backdrop_path: "/nmg2lY4QuyXQrAnrC2lRblK5rT6.jpg",
      genre_ids: [18],
      id: 1416,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Grey's Anatomy",
      overview:
        "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
      popularity: 4555.372,
      poster_path: "/jcEl8SISNfGdlQFwLzeEtsjDvpw.jpg",
      first_air_date: "2005-03-27",
      name: "Grey's Anatomy",
      vote_average: 8.241,
      vote_count: 9934,
    },
    {
      adult: false,
      backdrop_path: "/ueZFcwAUvkjyAB9beaiqJyg0M8H.jpg",
      genre_ids: [35, 18, 9648, 10765],
      id: 1981,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Charmed",
      overview:
        "Three sisters (Prue, Piper and Phoebe) reunite and unlock their powers to become the Charmed Ones, the most powerful good witches of all time, whose prophesied destiny is to protect innocent lives from evil beings such as demons and warlocks. Each sister possesses unique magical powers that grow and evolve, while they attempt to maintain normal lives in modern day San Francisco. ",
      popularity: 4453.225,
      poster_path: "/z4bPJ1BWU2EtV69NII2GVvsugQ2.jpg",
      first_air_date: "1998-10-07",
      name: "Charmed",
      vote_average: 8.194,
      vote_count: 2196,
    },
    {
      adult: false,
      backdrop_path: "/lhdUwhInXu31qHm65jwBAlpTp8P.jpg",
      genre_ids: [10767],
      id: 82873,
      origin_country: ["US"],
      original_language: "en",
      original_name: "The Kelly Clarkson Show",
      overview:
        "Kelly Clarkson presents the biggest newsmakers and names in film, television and music; as well as emerging new talent and everyday people who are beacons of hope in their communities.",
      popularity: 3621.119,
      poster_path: "/9Gg1oM8Us8gCS5aJA8e0ZRuIHnf.jpg",
      first_air_date: "2019-09-09",
      name: "The Kelly Clarkson Show",
      vote_average: 6.348,
      vote_count: 46,
    },
    {
      adult: false,
      backdrop_path: "/xl1wGwaPZInJo1JAnpKqnFozWBE.jpg",
      genre_ids: [35, 10767],
      id: 59941,
      origin_country: ["US"],
      original_language: "en",
      original_name: "The Tonight Show Starring Jimmy Fallon",
      overview:
        "After Jay Leno's second retirement from the program, Jimmy Fallon stepped in as his permanent replacement. After 42 years in Los Angeles the program was brought back to New York.",
      popularity: 3617.074,
      poster_path: "/g4amxJvtpnY79J77xeamnAEUO8r.jpg",
      first_air_date: "2014-02-17",
      name: "The Tonight Show Starring Jimmy Fallon",
      vote_average: 5.824,
      vote_count: 304,
    },
    {
      adult: false,
      backdrop_path: "/cvlLBcQWpO9X21jDHhgPJnE2aVq.jpg",
      genre_ids: [80, 18, 9648],
      id: 1431,
      origin_country: ["US"],
      original_language: "en",
      original_name: "CSI: Crime Scene Investigation",
      overview:
        "A Las Vegas team of forensic investigators are trained to solve criminal cases by scouring the crime scene, collecting irrefutable evidence and finding the missing pieces that solve the mystery.",
      popularity: 3502.91,
      poster_path: "/i5hmoRjHNWady4AtAGICTUXknKH.jpg",
      first_air_date: "2000-10-06",
      name: "CSI: Crime Scene Investigation",
      vote_average: 7.625,
      vote_count: 1155,
    },
    {
      adult: false,
      backdrop_path: "/layPSOJGckJv3PXZDIVluMq69mn.jpg",
      genre_ids: [80, 18],
      id: 1438,
      origin_country: ["US"],
      original_language: "en",
      original_name: "The Wire",
      overview:
        "Told from the points of view of both the Baltimore homicide and narcotics detectives and their targets, the series captures a universe in which the national war on drugs has become a permanent, self-sustaining bureaucracy, and distinctions between good and evil are routinely obliterated.",
      popularity: 3433.798,
      poster_path: "/4lbclFySvugI51fwsyxBTOm4DqK.jpg",
      first_air_date: "2002-06-02",
      name: "The Wire",
      vote_average: 8.6,
      vote_count: 2075,
    },
    {
      adult: false,
      backdrop_path: "/mc3rG5M9dFVjMfaCFNfbD5gu2pK.jpg",
      genre_ids: [16, 35],
      id: 1433,
      origin_country: ["US"],
      original_language: "en",
      original_name: "American Dad!",
      overview:
        "The series focuses on an eccentric motley crew that is the Smith family and their three housemates: Father, husband, and breadwinner Stan Smith; his better half housewife, Francine Smith; their college-aged daughter, Hayley Smith; and their high-school-aged son, Steve Smith. Outside of the Smith family, there are three additional main characters, including Hayley's boyfriend turned husband, Jeff Fischer; the family's man-in-a-goldfish-body pet, Klaus; and most notably the family's zany alien, Roger, who is \"full of masquerades, brazenness, and shocking antics.\"",
      popularity: 3429.03,
      poster_path: "/xnFFz3etm1vftF0ns8RMHA8XdqT.jpg",
      first_air_date: "2005-02-06",
      name: "American Dad!",
      vote_average: 6.944,
      vote_count: 2006,
    },
    {
      adult: false,
      backdrop_path: "/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg",
      genre_ids: [18, 9648, 10765],
      id: 1622,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Supernatural",
      overview:
        "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. ",
      popularity: 3428.375,
      poster_path: "/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg",
      first_air_date: "2005-09-13",
      name: "Supernatural",
      vote_average: 8.296,
      vote_count: 7262,
    },
    {
      adult: false,
      backdrop_path: "/x4lxFIhhrDI4nWtV8osnYwbGESV.jpg",
      genre_ids: [35],
      id: 1421,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Modern Family",
      overview:
        "The Pritchett-Dunphy-Tucker clan is a wonderfully large and blended family. They give us an honest and often hilarious look into the sometimes warm, sometimes twisted, embrace of the modern family.",
      popularity: 3386.814,
      poster_path: "/klL4yhwiU8aF4AuF5dCfJA9sRnS.jpg",
      first_air_date: "2009-09-23",
      name: "Modern Family",
      vote_average: 7.856,
      vote_count: 2594,
    },
    {
      adult: false,
      backdrop_path: "/8MQeyFsWrp2ILjbumtxrinmk7t4.jpg",
      genre_ids: [10765, 35, 18],
      id: 4620,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Eureka",
      overview:
        "The sleepy Pacific Northwest town of Eureka is hiding a mysterious secret. The government has been relocating the world's geniuses and their families to this rustic town for years where innovation and chaos have lived hand in hand. U.S. Marshal Jack Carter stumbles upon this odd town after wrecking his car and becoming stranded there. When the denizens of the town unleash an unknown scientific creation, Carter jumps in to try to restore order and consequently learns of one of the country's best kept secrets.",
      popularity: 3306.656,
      poster_path: "/f2l5hUk63hPqYTucnFy2HmElFV0.jpg",
      first_air_date: "2006-07-18",
      name: "Eureka",
      vote_average: 7.8,
      vote_count: 588,
    },
    {
      adult: false,
      backdrop_path: "/mLyW3UTgi2lsMdtueYODcfAB9Ku.jpg",
      genre_ids: [35],
      id: 2316,
      origin_country: ["US"],
      original_language: "en",
      original_name: "The Office",
      overview:
        "The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.",
      popularity: 3222.796,
      poster_path: "/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg",
      first_air_date: "2005-03-24",
      name: "The Office",
      vote_average: 8.572,
      vote_count: 3898,
    },
    {
      adult: false,
      backdrop_path: "/bFVx0ydejF6NE8SEAVz95ns0o6A.jpg",
      genre_ids: [18, 35],
      id: 34307,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Shameless",
      overview:
        "Chicagoan Frank Gallagher is the proud single dad of six smart, industrious, independent kids, who without him would be... perhaps better off. When Frank's not at the bar spending what little money they have, he's passed out on the floor. But the kids have found ways to grow up in spite of him. They may not be like any family you know, but they make no apologies for being exactly who they are.",
      popularity: 3190.747,
      poster_path: "/9akij7PqZ1g6zl42DQQTtL9CTSb.jpg",
      first_air_date: "2011-01-09",
      name: "Shameless",
      vote_average: 8.151,
      vote_count: 2543,
    },
    {
      adult: false,
      backdrop_path: "/8jgvqyz76ydAwLrntGn3jTaYr7S.jpg",
      genre_ids: [16, 35, 10759, 10765],
      id: 45854,
      origin_country: ["JP"],
      original_language: "ja",
      original_name: "遊☆戯☆王ZEXAL",
      overview:
        "When aspiring duelist Yuma meets Astral, a mysterious visitor from another universe, it seems like destiny. Yuma needs Astral to teach him how to duel, and Astral needs Yuma to help him regain his memories!\n\nThey would be dueling’s greatest tag team…. except they don't get along!\n\nThis dueling duo better get their act together quickly because ZEXAL is a whole new duel with greater challenges than ever before!\n\nFantastic new monsters!\n\nPowerful new cards!\n\nAugmented reality-powered duel technology!\n\nTogether, it takes dueling to the next level!",
      popularity: 3130.263,
      poster_path: "/3aZUtzeHQrLgQQdYNqHSbJqj59G.jpg",
      first_air_date: "2011-04-11",
      name: "Yu-Gi-Oh! Zexal",
      vote_average: 7.1,
      vote_count: 35,
    },
  ];
  const Alerttt = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete Doctor Who?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  const FirstRoute = () => (
    <View
      style={{ flex: 1, paddingTop: 20, paddingBottom: insets.bottom + 50 }}
    >
      
      <FlashList
        showsVerticalScrollIndicator={false}
        data={nowplayingmovies}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{
                uri: `https://www.themoviedb.org/t/p/w1280${item.poster_path}`,
              }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.original_title}</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "300",
                  marginBottom: 4,
                  color: "white",
                }}
              >
                1h32m | 1.2GB
              </Text>
              <View
                style={{
                  marginTop: "auto",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingRight: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "green",
                        fontSize: 10,
                        fontWeight: "400",
                      }}
                    >
                      8mb
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "400",
                      }}
                    >
                      114mb/224mb
                    </Text>
                  </View>
                  <Progress.Bar
                    progress={0.2}
                    color="green"
                    width={barWidth}
                    height={4}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity>
                    {/* <MaterialIcons name="restart-alt" size={24} color="white" /> */}
                    <FontAwesome5 name="play" size={18} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={Alerttt}>
                    <DeleteSvg height={22} width={22} color={"red"} />
                    {/* <MaterialIcons name="pause-circle" size={25} color="orange" /> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        estimatedItemSize={200}
      />
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{ flex: 1, paddingTop: 20, paddingBottom: insets.bottom + 50 }}
    >


      {/* <View
        style={{
          height: hp(60),
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
          Your show queue is empty!
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "200",
            color: "white",
            textAlign: "center",
          }}
        >
          Start adding to your collection by downloading your favorite series
          for offline viewing.
        </Text>
      </View> */}

      <FlashList
        showsVerticalScrollIndicator={false}
        data={seriesss}
        numColumns={2}
        automaticallyAdjustContentInsets={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 6,
              borderRadius: 15,
            }}
          >
            <Image
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 270,
                borderRadius: 15,
              }}
              source={{
                uri: `https://media.themoviedb.org/t/p/w1280${item.poster_path}`,
              }}
            />
          </TouchableOpacity>
        )}
        estimatedItemSize={20}
      />
    </View>
  );

  const renderScene = SceneMap({
    movie: FirstRoute,
    shows: SecondRoute,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "movie",
      title: "Movies",
      icon: <MovieSvg height={24} width={24} color={"white"} />,
    },
    {
      key: "shows",
      title: "Shows",
      icon: <SeriesSvg height={24} width={24} color={"white"} />,
    },
  ]);
  const renderTabBar = (props) => {
    return (
      <TabBar
        style={{
          backgroundColor: "#32353d",
          borderRadius: 25,
          overflow: "hidden",
        }}
        tabStyle={{
          flexDirection: "row",
          gap: 10,
        }}
        indicatorStyle={{
          height: "100%",
          backgroundColor: "white",
          borderRadius: 25,
        }}
        renderIcon={({ route, focused, color }) => {
          switch (route.key) {
            case "movie":
              return (
                <MovieSvg
                  height={24}
                  width={24}
                  color={focused ? "black" : "white"}
                />
              );
            case "shows":
              return (
                <SeriesSvg
                  height={24}
                  width={24}
                  color={focused ? "black" : "white"}
                />
              );
            default:
              return null;
          }
        }}
        {...props}
        renderLabel={({ focused, route }) => {
          return (
            <Text
              style={{
                color: focused ? "black" : "white",
                fontWeight: "bold",
                fontSize: 17,
              }}
            >
              {route.title}
            </Text>
          );
        }}
        // s
      />
    );
  };
  return (
    // <View style={styles.container}>
    //   <Button title={isDownloading ? "Pause Download" : "Resume Download"} onPress={isDownloading ? pauseDownload : resumeDownload} disabled={!downloadTask} />
    //   <Button title="Delete Downloaded File" onPress={deleteDownloadedFile} />
    //   <Button title="Download From URL" onPress={downloadAndProcessVideo} />
    //   <Progress.Bar progress={downloadProgress} width={200} />

    //   <Text>{downloadProgress > 0 ? `Download Progress: ${(downloadProgress * 100).toFixed(2)}%` : null}</Text>
    //   <StatusBar style="auto" />
    //   {downloadedUri && <Video source={{ uri: downloadedUri }} style={{ height: 200, width: 300, backgroundColor: "black" }} useNativeControls={true} />}
    // </View>
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }}
    >
      <StatusBar style="light" />
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 35 }}>
        Your Downloads
      </Text>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{
          backgroundColor: "black",
          marginTop: 20,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({

  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "white",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 20,
  },
  productImage: {
    width: 130,
    height: 190,
    marginRight: 16,
    borderRadius: 15,
  },
  productInfo: {
    flex: 1,
    marginTop: 5,
  },
  productName: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
    textAlign: "left",
  },
});
