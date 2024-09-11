import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Profile() {
  const menu = [
    {
      id: 1,
      name: "Add new Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "My Post",
      icon: "bookmark",
      path: "/user-post",
    },
    {
      id: 3,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 4,
      name: "Chat",
      icon: "chatbubble",
      path: "/(tabs)/chat",
    },
    {
      id: 5,
      name: "LogOut",
      icon: "log-out",
      path: "logout",
    },
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const OnPressMenu = (item) => {
    if (item.path === "logout") {
      return;
      signOut();
    }
    router.push(item.path);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit_medium", fontSize: 30 }}>Profile</Text>
      <View
        style={{ display: "flex", alignItems: "center", marginVertical: 20 }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
        <Text style={{ fontFamily: "outfit_bold", fontSize: 20, marginTop: 6 }}>
          {user?.fullName}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View>
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => OnPressMenu(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
                gap: 10,
                backgroundColor: Colors.WHITE,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons
                name={item.icon}
                size={30}
                color={Colors.PRIMARY}
                style={{
                  padding: 10,
                  backgroundColor: Colors.LIGHT_PRIMARY,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{ fontFamily: "outfit", fontSize: 16, marginLeft: 10 }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
