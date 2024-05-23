import { View, Text } from "react-native";
import React from "react";

const TitleTagline = ({title,tagline}) => {
  return (
    <View>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {
        tagline && 
        <Text
        style={{
          color: "white",
          fontWeight: "200",
          fontSize: 17,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        {tagline}
      </Text>
      }
      
    </View>
  );
};

export default TitleTagline;
