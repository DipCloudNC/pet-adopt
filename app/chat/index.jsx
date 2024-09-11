import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment/moment";

export default function Chat() {
  const params = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUsersDetails();

    const messagesCollectionRef = collection(
      db,
      "Chat",
      params?.id,
      "Messages"
    );
    const messagesQuery = query(messagesCollectionRef);

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageData);
    });

    return () => unsubscribe();
  }, [params?.id]);

  const GetUsersDetails = async () => {
    const docRef = doc(db, "Chat", params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);

    const otherUsers = result?.users.filter(
      (item) => item.email !== user?.primaryEmailAddress?.emailAddress
    );
    console.log(otherUsers);

    navigation.setOptions({
      title: otherUsers[0]?.name || "Chat",
    });
  };

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    newMessages[0].createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    await addDoc(collection(db, "Chat", params.id, "Messages"), newMessages[0]);
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        showUserAvatar={true}
        user={{
          _id: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
          avatar: user?.imageUrl,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
