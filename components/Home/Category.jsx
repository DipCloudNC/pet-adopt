import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";
import Colors from "./../../constants/Colors";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState("Birds");
  useEffect(() => {
    getCategories();
  }, []);

  // Fetching data from Firestore

  const getCategories = async () => {
    setCategoryList([]); // Clearing previous data before fetching new ones
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      //   console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit_medium",
          fontSize: 20,
          paddingVertical: 5,
        }}
      >
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategoryList(item.name);
              category(item.name);
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.container,
                selectedCategoryList == item.name &&
                  styles.selectedCategorycontainer,
              ]}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  categoryText: {
    fontFamily: "outfit",
    fontSize: 14,
    textAlign: "center",
  },
  selectedCategorycontainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});
