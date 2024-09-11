import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "./../../components/Home/Header";
import Sliders from "../../components/Home/Sliders";
import PetsListByCategory from "../../components/Home/PetsListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "./../../constants/Colors";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Sliders />
      {/* Category + List of pets */}
      <PetsListByCategory />

      {/* Add new  pets options */}
      <Link href={"/add-new-pet"} style={styles.addNewpets}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
          style={{
            fontFamily: "outfit_medium",
            fontSize: 18,
            color: Colors.PRIMARY,
          }}
        >
          Add New Pet
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewpets: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    justifyContent: "center",
    borderStyle: "dashed",
    textAlign: "center",
  },
});
