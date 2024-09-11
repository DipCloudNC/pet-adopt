import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function header() {
  const { user } = useUser();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Welcome...
        </Text>
        <Text
          style={{
            fontFamily: "outfit_medium",
            fontSize: 25,
          }}
        >
          {user?.fullName}
        </Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
    </View>
  );
}
