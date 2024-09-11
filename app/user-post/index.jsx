import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import PetsListitem from "./../../components/Home/PetsListItem";
import Colors from "./../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function UserPost() {
  const navigation = useNavigation();
  const [userPostsList, setUserPostsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Post",
    });

    if (user) {
      GetUserPost();
    }
  }, [user]);

  // Fetch user's posts based on email address from Firestore database

  const GetUserPost = async () => {
    setLoading(true);
    setUserPostsList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserPostsList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  const OnDeletePost = (DocId) => {
    Alert.alert("Do you want to delete", "Do you really want to delete", [
      { text: "Yes", onPress: () => DeletePost(DocId) },
      { text: "No", onPress: () => console.log("Cancel Pressed") },
    ]);
  };
  const DeletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit_medium", fontSize: 25 }}>
        UserPost
      </Text>
      <View>
        <FlatList
          data={userPostsList}
          numColumns={2}
          refreshing={loading}
          onRefresh={GetUserPost}
          renderItem={({ item, index }) => (
            <View>
              <PetsListitem pets={item} key={index} />
              <Pressable
                onPress={() => OnDeletePost(item.id)}
                style={styles.deleteBtn}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete-empty"
                    size={24}
                    color="black"
                  />
                  <Text style={{ fontFamily: "outfit_medium", fontSize: 16 }}>
                    Delete
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        />
        {userPostsList?.length == 0 && (
          <View>
            <Image
              source={require("./../../assets/images/welcome.png")}
              style={styles.image}
            />

            <Text style={styles.message}>No Posts Found...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    width: "95%",
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontFamily: "outfit_medium",
    textAlign: "center",
    backgroundColor: Colors.SECONDARY,
    padding: 10,
    borderRadius: 10,
  },
});
