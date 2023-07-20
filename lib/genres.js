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

export async function getAllGenres() {
  let list = [];
  const querySnapshot = await getDocs(collection(firestore, "genres"));
  querySnapshot.forEach((doc) => {
    if (doc.data()) {
      const data = {
        tip_id: doc.id,
        ...doc.data(),
      };
      if (data.updatedAt) {
        // Format the updatedAt timestamp
        const updatedAt = new Date(data.updatedAt.seconds * 1000);
        data.updatedAt = updatedAt.toLocaleDateString("nl-NL", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      if (data.createdAt) {
        // Format the updatedAt timestamp
        const createdAt = new Date(data.createdAt.seconds * 1000);
        data.createdAt = createdAt.toLocaleDateString("nl-NL", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      list.push(data);
    }
  });
  return list;
}

export async function uploadGenre(data) {
  const { title, ...restData } = data;

  // Add the createdAt and updatedAt fields to the data object
  const timestamp = serverTimestamp();

  // Update the data with the correct variables
  const updatedData = {
    ...restData,
    title: title.toLowerCase(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  // Add the data to the "tips" collection
  const readingRef = collection(firestore, "genres");

  try {
    // Add the data to the "tips" collection
    await addDoc(readingRef, updatedData);
    console.log("Genre uploaded successfully");
    // Additional logic after successful upload
  } catch (error) {
    console.error("Error uploading genre:", error);
    // Additional error handling
  }
}

export async function deleteGenre(tip_id) {
  const readingRef = doc(firestore, "genres", tip_id);
  try {
    await deleteDoc(readingRef);
    console.log("Tip deleted");
    // Additional logic after successful update
  } catch (error) {
    console.error("Error deleting the tip:", error);
    // Additional error handling
  }
}

export async function updateGenre(tip_id, newDetails) {
  const { title, ...restData } = newDetails;

  // Add the createdAt and updatedAt fields to the data object
  const timestamp = serverTimestamp();

  // Update the data with the correct variables
  const updatedData = {
    title: title.toLowerCase(),
    updatedAt: timestamp,
  };

  const readingRef = doc(firestore, "genres", tip_id);

  try {
    await updateDoc(readingRef, updatedData);
    console.log("Tip details updated successfully");
    // Additional logic after successful update
  } catch (error) {
    console.error("Error updating tip details:", error);
    // Additional error handling
  }
}
