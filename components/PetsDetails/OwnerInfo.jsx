import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function OwnerInfo({ pets }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: pets?.userImage }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
          }}
        />
        <View>
          <Text style={{ fontSize: 16, fontFamily: "outfit_medium" }}>
            {pets?.userName}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "outfit", color: Colors.GRAY }}
          >
            Pet Owner
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="send-circle"
        size={40}
        color={Colors.PRIMARY}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    gap: 20,
  },
});
