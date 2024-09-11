import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "../../components/Inbox/UserItem";

export default function Chat() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetUserList();
    }
  }, [user]);

  const GetUserList = async () => {
    setLoading(true);
    setUserList([]);
    try {
      const q = query(
        collection(db, "Chat"),
        where("userId", "array-contains", user.primaryEmailAddress.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      const userData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const otherUser = data.users?.find(
          (u) => u.email !== user.primaryEmailAddress.emailAddress
        );
        if (otherUser) {
          userData.push({ docId: doc.id, ...otherUser });
        }
      });
      setUserList(userData);
    } catch (error) {
      console.error("Error fetching user list: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit_medium", fontSize: 30 }}>Inbox</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={userList}
          refreshing={loading}
          onRefresh={GetUserList}
          renderItem={({ item }) => <UserItem userInfo={item} />}
          keyExtractor={(item) => item.docId}
        />
      )}
    </View>
  );
}
