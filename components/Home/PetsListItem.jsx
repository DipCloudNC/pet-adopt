import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "../MarkFav";
export default function PetsListItem({ pets }) {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/pets_details", params: pets })}
        style={{
          backgroundColor: Colors.WHITE,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 10,
          shadowColor: Colors.PRIMARY,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          marginRight: 5,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            right: 10,
            top: 10,
          }}
        >
          <MarkFav pets={pets} />
        </View>
        <Image
          source={{ uri: pets?.imageUrl }}
          style={{
            width: 150,
            height: 130,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
        <Text style={{ fontFamily: "outfit_medium", fontSize: 16 }}>
          {pets?.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Text
            style={{ fontFamily: "outfit", fontSize: 12, color: Colors.GRAY }}
          >
            {pets?.breed}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 10,
              color: Colors.PRIMARY,
              paddingHorizontal: 5,
              borderRadius: 5,
              backgroundColor: Colors.LIGHT_PRIMARY,
              overflow: "hidden",
              padding: 2,
            }}
          >
            {pets?.age} YRS
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
