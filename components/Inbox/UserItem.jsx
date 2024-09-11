import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

export default function UserItem({ userInfo }) {
  const router = useRouter();

  return (
    <Link href={"/chat?id=" + userInfo.docId}>
      <View style={styles.container}>
        <Image
          source={{ uri: userInfo?.imageUrl || defaultImageUrl }}
          style={styles.image}
        />
        <Text style={styles.text}>{userInfo?.name || defaultName}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  text: {
    fontFamily: "outfit",
    fontSize: 20,
  },
});
