import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";

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
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  UploadTask,
  deleteObject,
} from "firebase/storage";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCbfMO0lZVnDGK_736ZHLOsuSJWpjX9jCU",
  authDomain: "narrata-platform-development.firebaseapp.com",
  projectId: "narrata-platform-development",
  storageBucket: "narrata-platform-development.appspot.com",
  messagingSenderId: "905191994123",
  appId: "1:905191994123:web:4f405bdd9b2546b05d680e",
};

// Initialize Firebase

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// const firebaseApp = initializeApp(firebaseConfig);

const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports

export const auth = getAuth(firebaseApp);

// Firestore exports

export const firestore = getFirestore(firebaseApp);

// Storage exports

export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

///Helper functions
// Gets a users/{uid} document with username
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  return userDoc;
}

/**`
 *
 *
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
