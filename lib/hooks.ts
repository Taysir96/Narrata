import {
  DocumentData,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../lib/firebase";
import { Unsubscribe } from "firebase/auth";

interface UserData {
  // Define the structure of your user data
  username: string;
  email: string;
  role: string;
  created_at: number;
  uid: string;

  // Add other properties as needed
}

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [followingProfiles, setFollowingProfiles] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchFollowingProfilesFromSessionStorage();
    } else {
      setUserData(null);
      setFollowingProfiles([]);
    }
  }, [user]);

  const fetchUserData = async () => {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // User not found
      setUserData(null);
    } else {
      const docSnapshot = querySnapshot.docs[0];
      const userDataFromSnapshot = {
        ...docSnapshot.data(),
      } as UserData;
      setUserData(userDataFromSnapshot);
    }
  };
  const fetchFollowingProfilesFromSessionStorage = () => {
    const storedFollowingProfiles = sessionStorage.getItem("followingProfiles");

    if (storedFollowingProfiles) {
      setFollowingProfiles(JSON.parse(storedFollowingProfiles));
    } else {
      fetchFollowingProfiles();
    }
  };

  const fetchFollowingProfiles = async () => {
    console.log("fetchFollowingProfiles");
    try {
      const list = [];
      const subscriptionsRef = collection(firestore, "subscriptions");
      const q = query(subscriptionsRef, where("followerId", "==", user.uid));
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

      // Store followingProfiles in sessionStorage
      sessionStorage.setItem("followingProfiles", JSON.stringify(list));
      setFollowingProfiles(list);
    } catch (error) {
      console.error("Error getting following profiles:", error);
    }
  };

  return { user, userData, followingProfiles, fetchFollowingProfiles };
}
