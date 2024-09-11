import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
export default function PestSubInfoCard({ icon, title, value }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        gap: 10,
        flex: 1,
      }}
    >
      <Image
        source={icon}
        style={{
          width: 40,
          height: 40,
        }}
      />
      <View>
        <Text
          style={{ fontSize: 14, color: Colors.GRAY, fontFamily: "outfit" }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.PRIMARY,
            fontFamily: "outfit_medium",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
