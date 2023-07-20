import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore, storage } from "./firebase";

export async function getLanguageDialects(language) {
  const dialectsRef = collection(firestore, "dialects");
  const q = query(dialectsRef, where("language", "==", language));
  const querySnapshot = await getDocs(q);

  let dialects = [];
  querySnapshot.forEach((doc) => {
    dialects.push(doc.data());
  });

  return dialects;
}
