import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Category from "./Category";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import PetsListItem from "./PetsListItem";

export default function PetsListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  //   use to pets list on category selection

  useEffect(() => {
    getPetList("Birds");
  }, []);

  const getPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => getPetList(value)} />
      <FlatList
        data={petList}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => getPetList("Birds")}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <PetsListItem pets={item} />}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
