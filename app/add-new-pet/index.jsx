import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "./../../config/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    category: "Birds",
    sex: "Male",
  });
  const [gender, setGender] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState({});
  const { user } = useUser(); // Call useUser() as a function
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ title: "Add New Pet" });
    getCategories(); // Call the function correctly here
  }, []);

  const getCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Category"));
      const categories = snapshot.docs.map((doc) => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const imagePicker = async () => {
    // Fixed typo in function name
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = () => {
    const newEmptyFields = {
      name: !formData.name,
      category: !formData.category,
      breed: !formData.breed,
      age: !formData.age,
      gender: !gender,
      weight: !formData.weight,
      about: !formData.about,
    };

    if (Object.values(newEmptyFields).includes(true)) {
      setEmptyFields(newEmptyFields);
      ToastAndroid.show("Please fill all required fields", ToastAndroid.TOP);
      return;
    }
    setEmptyFields({}); // Clear empty fields if all are filled
    uploadImage();
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const response = await fetch(image);
      const blobImage = await response.blob();
      const storageRef = ref(storage, `/pet_adopt/${Date.now()}.jpg`);

      await uploadBytes(storageRef, blobImage);
      const downloadURL = await getDownloadURL(storageRef);
      SaveFormData(downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
      ToastAndroid.show("Error uploading image", ToastAndroid.TOP);
    } finally {
      setLoading(false);
    }
  };

  const SaveFormData = async (imageUrl) => {
    const docID = Date.now().toString();
    try {
      await setDoc(doc(db, "Pets", docID), {
        ...formData,
        imageUrl: imageUrl,
        userName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        id: docID,
      });
      ToastAndroid.show("Pet added successfully", ToastAndroid.TOP);
    } catch (error) {
      console.error("Error saving document: ", error);
      ToastAndroid.show("Error saving pet data", ToastAndroid.TOP);
    } finally {
      setLoading(false);
    }
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit_medium", fontSize: 20 }}>
        Add New Pet For Adoption
      </Text>
      <View style={styles.container}>
        <Pressable onPress={imagePicker} style={styles.pressable}>
          <Image
            source={
              image ? { uri: image } : require("./../../assets/images/pet.png")
            }
            style={styles.image}
          />
        </Pressable>
      </View>

      <View style={styles.inputcontainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          placeholder="Pet Name..."
          style={[styles.input, emptyFields.name && { borderColor: "red" }]}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => {
              setSelectedCategory(itemValue);
              handleInputChange("category", itemValue);
            }}
          >
            {categoryList.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          placeholder="Breed..."
          style={[styles.input, emptyFields.breed && { borderColor: "red" }]}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          placeholder="Age..."
          style={[styles.input, emptyFields.age && { borderColor: "red" }]}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>Gender *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => {
              setGender(itemValue);
              handleInputChange("gender", itemValue);
            }}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          placeholder="Weight..."
          style={[styles.input, emptyFields.weight && { borderColor: "red" }]}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          placeholder="Address..."
          style={[styles.input, emptyFields.address && { borderColor: "red" }]}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          placeholder="About..."
          style={[
            styles.textarea,
            { height: 100 },
            emptyFields.about && { borderColor: "red" },
          ]}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={onSubmit}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={styles.buttonText}>Add Pet</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputcontainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingHorizontal: 15,
    fontFamily: "outfit",
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    height: 55,
    backgroundColor: "white",
  },
  textarea: {
    height: 120,
    padding: 15,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    textAlignVertical: "top",
  },
  label: {
    fontFamily: "outfit_medium",
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "outfit_medium",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 5,
    width: "100%",
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
  },
  container: {
    padding: 10,
  },
  pressable: {
    width: 120,
    height: 120,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.PRIMARY,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
