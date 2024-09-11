import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";
export default function Sliders() {
  const [slidersList, setSlidersList] = useState([]);

  // Fetching data from Firestore

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    setSlidersList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setSlidersList((slidersList) => [...slidersList, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={slidersList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles?.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 130,
    resizeMode: "cover",
    marginVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});
