import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import MarkFav from "../MarkFav";
export default function PetsInfo({ pets }) {
  return (
    <View>
      <Image
        source={{ uri: pets.imageUrl }}
        style={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          alignSelf: "center",
          marginBottom: 10,
        }}
      />
      <View
        style={{
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "outfit_bold", fontSize: 22 }}>
            {pets?.name}
          </Text>
          <Text
            style={{ fontFamily: "outfit", fontSize: 14, color: Colors.GRAY }}
          >
            {pets?.address}
          </Text>
        </View>
        <MarkFav pets={pets} />
      </View>
    </View>
  );
}
