import { View, Text } from "react-native";
import React from "react";
const convertMinutesToHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = hours > 0 ? `${hours}h${minutes}m` : `${minutes}m`;
  return formattedTime;
};
const convertArrayofLanguagesToString = (languages) => {
  const array_of_languages = languages?.map((value) => value?.name);
  return array_of_languages?.join(", ");
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
const ShortInfo = ({ duration, status, languages, release_date }) => {
  return (
    <View
      style={{
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flex: 1,
      }}
    >
      <View style={{ gap: 5 }}>
        <Text style={{ color: "white", fontWeight: "300" }}>
          {duration && "Duration"} {status && "Status"}
        </Text>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {duration && convertMinutesToHoursAndMinutes(duration)}{" "}
          {status && status}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ color: "white", fontWeight: "300" }}>Language</Text>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {convertArrayofLanguagesToString(languages)}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ color: "white", fontWeight: "300" }}>Release date</Text>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {formatDate(release_date)}
        </Text>
      </View>
    </View>
  );
};

export default ShortInfo;
