import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetsInfo from "../../components/PetsDetails/PetsInfo";
import PetsSubInfo from "../../components/PetsDetails/PetsSubInfo";
import AboutPets from "../../components/PetsDetails/AboutPets";
import OwnerInfo from "../../components/PetsDetails/OwnerInfo";
import Colors from "./../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function PetsDetails() {
  const pets = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
    });
  }, [navigation]);

  const initiateChat = async () => {
    const docId01 = `${user?.primaryEmailAddress?.emailAddress}_${pets?.email}`;
    const docId02 = `${pets?.email}_${user?.primaryEmailAddress?.emailAddress}`;

    console.log("User:", user);
    console.log("Pets:", pets);

    try {
      const chatQuery = query(
        collection(db, "Chat"),
        where("id", "in", [docId01, docId02])
      );
      const querySnapshot = await getDocs(chatQuery);

      if (!querySnapshot.empty) {
        // Chat exists, navigate to the existing chat
        const chatId = querySnapshot.docs[0].id;
        router.push({ pathname: "/chat", params: { id: chatId } });
      } else {
        // Create a new chat
        await setDoc(doc(db, "Chat", docId01), {
          id: docId01,
          users: [
            {
              email: user?.primaryEmailAddress?.emailAddress ?? "No email",
              imageUrl: user?.imageUrl ?? "No image",
              name: user?.fullName ?? "No name",
            },
            {
              email: pets?.email ?? "No email",
              imageUrl: pets?.userImage ?? "No image",
              name: pets?.userName ?? "No name",
            },
          ],
          userId: [
            user?.primaryEmailAddress?.emailAddress ?? "No email",
            pets?.email ?? "No email",
          ],
        });
        router.push({ pathname: "/chat", params: { id: docId01 } });
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
      Alert.alert("Error", "Unable to initiate chat. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <PetsInfo pets={pets} />
        <PetsSubInfo pets={pets} />
        <AboutPets pets={pets} />
        <OwnerInfo pets={pets} />
        <View style={styles.spacer}></View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={initiateChat} style={styles.adoptButton}>
          <Text style={styles.adoptButtonText}>Adopt Me...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  spacer: {
    height: 50,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  adoptButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  adoptButtonText: {
    fontFamily: "outfit_medium",
    fontSize: 20,
    color: "white",
  },
});
