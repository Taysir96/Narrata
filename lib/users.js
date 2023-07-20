import {
  getFirestore,
  collection,
  where,
  getDocs,
  getDoc,
  query,
  limit,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  UploadTask,
  deleteObject,
} from "firebase/storage";

import { auth, firestore, storage } from "./firebase";

export async function getAllUsers() {
  let list = [];
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    if (doc.data()) {
      const data = {
        user_id: doc.id,
        ...doc.data(),
      };

      list.push(data);
    }
  });
  return list;
}

export async function updateProfile(object_id, newDetails) {
  const { username, description, interests, ...restData } = newDetails;

  // Add the createdAt and updatedAt fields to the data object
  const timestamp = serverTimestamp();

  // Update the data with the correct variables
  const updatedData = {
    username: username,
    description: description,
    updatedAt: timestamp,
  };

  const readingRef = doc(firestore, "users", object_id);

  try {
    console.log(updatedData);
    await updateDoc(readingRef, updatedData);
    console.log("Profile details updated successfully");
    // Additional logic after successful update
  } catch (error) {
    console.error("Error updating profile details:", error);
    // Additional error handling
  }
}
