import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../constants/Colors";

export default function MarkFav({ pets }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    if (!user) {
      console.error("No user found");
      return;
    }

    const email = user?.primaryEmailAddress?.emailAddress;
    const docRef = doc(db, "UserFavPet", email);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Fetched favorites:", docSnap.data());
        setFavList(docSnap.data().favorites || []);
      } else {
        const defaultData = {
          email: email,
          favorites: [],
        };
        await setDoc(docRef, defaultData);
        setFavList(defaultData.favorites);
        // console.log("Created new document with default data:", defaultData);
      }
    } catch (error) {
      console.error("Error fetching favorite list:", error);
    }
  };

  const AddToFav = async () => {
    if (!user || !pets?.id) {
      console.error("User or pet ID is missing");
      return;
    }

    const updatedFavList = [...favList, pets.id];
    const email = user.primaryEmailAddress.emailAddress;
    const docRef = doc(db, "UserFavPet", email);

    try {
      await updateDoc(docRef, {
        favorites: updatedFavList,
      });
      setFavList(updatedFavList);
      // console.log("Added to favorites:", updatedFavList);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const RemoveFromFav = async () => {
    if (!user || !pets?.id) {
      console.error("User or pet ID is missing");
      return;
    }

    const updatedFavList = favList.filter((id) => id !== pets.id);
    const email = user.primaryEmailAddress.emailAddress;
    const docRef = doc(db, "UserFavPet", email);

    try {
      await updateDoc(docRef, {
        favorites: updatedFavList,
      });
      setFavList(updatedFavList);
      // console.log("Removed from favorites:", updatedFavList);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <View>
      {favList.includes(pets.id) ? (
        <Pressable onPress={RemoveFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={Colors.PRIMARY} />
        </Pressable>
      )}
    </View>
  );
}
