import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";

import { auth, firestore } from "./firebase";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";



  
  export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential) {
              // Assign full name based on first.last.name@email.com
              const atIndex = email.indexOf('@');
              let username = email.substring(0, atIndex).replace(/\./g, ' ');
  
              // capitalize full name
              username = username
                  .split(' ')
                  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                  .join(' ');
                  
          let collRef = collection(firestore, "users");
          let result = await addDoc(collRef, {
            username: username,
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            role: "user",
            created_at: Date.now(),
          });
        } else {
          throw new Error("Failed to register user.");
        }
    
    
    
        return userCredential;
      } catch (error) {
        console.log(error)
        let errorMessage = "Registratie mislukt. Probeer nog eens!"; // Default error message
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          errorMessage = "Email is al in gebruik.";
        } else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
          errorMessage = "Zwak wachtwoord, het wachtwoord moet minimaal 6 characters bevatten.";
        } // Add more conditions for specific error messages if needed
    
        throw new Error(errorMessage);
      }
}


export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential) {
            return userCredential;
        } else {
            throw new Error('Failed to login user.');
        }
    } catch (error) {
        throw error;
    }
}



//
export async function logoutUser() {
    try {
        const userCredential = await getAuth().signOut();
        return null;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return error;
    }
}


export const passwordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email)
}


export const confirmThePasswordReset = async (
  oobCode, newPassword
  ) => {
  if(!oobCode && !newPassword) return;
  
  return await confirmPasswordReset(auth, oobCode, newPassword)
  }


