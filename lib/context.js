import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  userData: null,
  followingProfiles: [],
  fetchFollowingProfiles: () => {}, // Initialize followingProfiles as an empty array
});
