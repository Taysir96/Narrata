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

export async function findSubscription(followerId, followingId) {
  try {
    const subscriptionsRef = collection(firestore, "subscriptions");
    const q = query(
      subscriptionsRef,
      where("followerId", "==", followerId),
      where("followingId", "==", followingId)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error finding subscription:", error);
    return false;
  }
}

export async function unfollowUser(followerId, followingId) {
  const subscriptionsRef = collection(firestore, "subscriptions");

  try {
    const q = query(
      subscriptionsRef,
      where("followerId", "==", followerId),
      where("followingId", "==", followingId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    console.log("Successfully unfollowed the user.");
    // Additional logic after successful update
  } catch (error) {
    console.error("Error unfollowing the user:", error);
    // Additional error handling
  }
}

export async function followUser(followerId, followingId) {
  const subscriptionsRef = collection(firestore, "subscriptions");

  try {
    const q = query(
      subscriptionsRef,
      where("followerId", "==", followerId),
      where("followingId", "==", followingId)
    );
    const querySnapshot = await getDocs(q);

    // Check if the subscription already exists before creating a new one
    if (querySnapshot.empty) {
      // Add the createdAt and updatedAt fields to the data object
      const timestamp = serverTimestamp();
      const newSubscription = {
        followerId: followerId,
        followingId: followingId,
        createdAt: timestamp,
      };

      await addDoc(subscriptionsRef, newSubscription);

      console.log("Successfully followed the user.");
      return true;
      // Additional logic after successful update
    } else {
      console.log("You are already following this user.");
      // Additional logic if the user is already followed
    }
  } catch (error) {
    console.error("Error following the user:", error);
    // Additional error handling
  }
}

export async function getFollowersAmount(followingId) {
  try {
    // Create a query to find all documents in the "subscriptions" collection
    // where the "followerId" field is equal to the provided "followerId"
    const q = query(
      collection(firestore, "subscriptions"),
      where("followingId", "==", followingId)
    );

    // Execute the query and get the snapshot of documents
    const querySnapshot = await getDocs(q);

    // Get the count of documents in the query snapshot using the "size" method
    const followersAmount = querySnapshot.size;

    return followersAmount;
  } catch (error) {
    console.error("Error getting followers amount:", error);
    throw error;
  }
}

export async function getAllFollowedProfiles(uid) {
  try {
    const list = [];
    const subscriptionsRef = collection(firestore, "subscriptions");
    const q = query(subscriptionsRef, where("followerId", "==", uid));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      if (doc.exists()) {
        const subscriptionData = doc.data();
        const followingId = subscriptionData.followingId; // Assuming followingId is the field containing the user's uid in the subscriptions document

        // Find the user document where the uid matches the followingId
        const userRef = collection(firestore, "users");
        const userQuery = query(userRef, where("uid", "==", followingId));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          const data = {
            subscription_id: doc.id,
            ...subscriptionData,
            profilePictureUrl: userData.profilePictureUrl, // Assuming you have this field in your user document
            username: userData.username, // Assuming you have this field in your user document
          };
          list.push(data);
        }
      }
    }

    return list;
  } catch (error) {
    console.error("Error getting readings by UID:", error);
    throw error;
  }
}
