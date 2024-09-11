import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Share from "./../../shared/Share";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import PetsListitem from "./../../components/Home/PetsListItem";

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavIds();
    }
  }, [user]);

  useEffect(() => {
    if (favIds.length > 0) {
      GetFavPetList();
    }
  }, [favIds]);

  // Fetch favorite IDs
  const GetFavIds = async () => {
    setLoader(true);
    try {
      const result = await Share.GetFavList(user);
      console.log("Favorite IDs:", result?.favorites);
      setFavIds(result?.favorites || []);
    } catch (error) {
      console.error("Error fetching favorite IDs:", error);
    } finally {
      setLoader(false);
    }
  };

  // Fetch related pets list
  const GetFavPetList = async () => {
    setLoader(true);
    try {
      const q = query(collection(db, "Pets"), where("id", "in", favIds));
      const querySnapshot = await getDocs(q);
      const pets = querySnapshot.docs.map((doc) => doc.data());
      // console.log("Favorite Pets:", pets);
      setFavPetList(pets);
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit_medium", fontSize: 30 }}>
        Favorites
      </Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavIds}
        refreshing={loader}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <PetsListitem pets={item} />
          </View>
        )}
      />
    </View>
  );
}
