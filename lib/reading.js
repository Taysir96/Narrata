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

export async function uploadReading(data) {
  const { thumbnailFile, videoFiles, ...restData } = data;

  // Add the createdAt and updatedAt fields to the data object
  const timestamp = serverTimestamp();

  // Update the data with the correct variables
  const updatedData = {
    ...restData,
    status: "In Wacht",
    createdAt: timestamp,
    updatedAt: timestamp,
    views: 0,
  };

  // Add the data to the "readings" collection
  const readingRef = collection(firestore, "readings");

  try {
    // Upload each video file to Firebase Storage
    const storagePromises = videoFiles.map(async (videoFile, index) => {
      const { file, subtitle } = videoFile;
      const storageRef = ref(storage, `videos_reading/${file.name}`);
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded video
      const url = await getDownloadURL(storageRef);

      // If the subtitle is empty, set the default subtitle format
      const formattedSubtitle =
        subtitle.trim() === "" ? `Hoofdstuk ${index + 1}` : subtitle;

      return { url, subtitle: formattedSubtitle };
    });

    // Wait for all storage uploads to complete
    const uploadedVideos = await Promise.all(storagePromises);

    // Update the data with the uploaded video URLs and subtitles
    updatedData.videoFiles = uploadedVideos;

    // Upload the Preview image file to Firebase Storage
    const previewImageUrl = await new Promise((resolve, reject) => {
      const storageRef = ref(storage, `thumbnails/${thumbnailFile.name}`);
      const uploadTask = uploadBytes(storageRef, thumbnailFile);

      uploadTask
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadUrl) => resolve(downloadUrl))
        .catch((error) => reject(error));
    });
    updatedData.thumbnailUrl = previewImageUrl;

    // Add the data to the "readings" collection
    await addDoc(readingRef, updatedData);
    console.log("Reading uploaded successfully");
    // Additional logic after successful upload
  } catch (error) {
    console.error("Error uploading reading:", error);
    // Additional error handling
  }
}

export async function getAllReadings() {
  let list = [];
  const querySnapshot = await getDocs(collection(firestore, "readings"));
  querySnapshot.forEach((doc) => {
    if (doc.data()) {
      const data = {
        reading_id: doc.id,
        ...doc.data(),
      };
      list.push(data);
    }
  });

  // Fetch the username for each reading's user based on their UID
  const updatedList = await Promise.all(
    list.map(async (reading) => {
      try {
        const response = await fetch(`/api/users/${reading.uid}`);
        const userData = await response.json();
        reading.username = userData.username;
        return reading;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return reading;
      }
    })
  );

  return updatedList;
}

// update the status of the reading document
export async function updateReadingStatus(readingId, status) {
  const readingRef = doc(firestore, "readings", readingId);

  try {
    await updateDoc(readingRef, { status });
    console.log("Reading status updated successfully");
    // Additional logic after successful update
  } catch (error) {
    console.error("Error updating reading status:", error);
    // Additional error handling
  }
}

// delete reading with specific reading_id
export async function deleteReading(readingId) {
  const readingRef = doc(firestore, "readings", readingId);

  try {
    await deleteDoc(readingRef);
    console.log("Reading successfully deleted");
    // Additional logic after successful update
  } catch (error) {
    console.error("Error with deleting the reading:", error);
    // Additional error handling
  }
}

export async function getAllReadingsByUid(uid) {
  try {
    const readingsRef = collection(firestore, "readings");
    const q = query(readingsRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const readings = [];
    querySnapshot.forEach((doc) => {
      const {
        ageGroup,
        createdAt,
        title,
        genre,
        selectedDialect,
        language,
        thumbnailUrl,
        uid,
        views,
      } = doc.data();
      const reading = {
        ageGroup,
        createdAt,
        title,
        genre,
        selectedDialect,
        language,
        thumbnailUrl,
        id: doc.id,
        uid,
        views,
      };
      readings.push(reading);
    });

    return readings;
  } catch (error) {
    console.error("Error getting readings by UID:", error);
    throw error;
  }
}
