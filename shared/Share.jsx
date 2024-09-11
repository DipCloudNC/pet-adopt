import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./../config/firebaseConfig";

const GetFavList = async (user) => {
  if (!user) {
    console.error("User is not authenticated");
    return null;
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const docRef = doc(db, "UserFavPet", email);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      const defaultData = {
        email: email,
        favorites: [],
      };
      await setDoc(docRef, defaultData);
      // console.log("New document created:", defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return null;
  }
};

const UpdateFav = async (user, favorites) => {
  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const docRef = doc(db, "UserFavPet", email);

  try {
    await updateDoc(docRef, {
      favorites: favorites,
    });
    console.log("Favorites updated:", favorites);
  } catch (error) {
    console.error("Error updating favorites:", error);
  }
};

export default {
  GetFavList,
  UpdateFav,
};
