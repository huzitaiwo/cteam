import { useState, useEffect } from "react";
import {
  firebaseAuth,
  firebaseStorage,
  firebaseFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [unMounted, setUnMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail, location) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const photo = await firebaseStorage.ref(uploadPath).put(thumbnail);
      const photoURL = await photo.ref.getDownloadURL();

      // add displayName and photoURL to user
      await res.user.updateProfile({ displayName, photoURL, location });

      // create a user document
      await firebaseFirestore.collection("users").doc(res.user.uid).set({
        displayName,
        email,
        online: true,
        photoURL,
        location,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!unMounted) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!unMounted) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setUnMounted(true);
  }, []);

  return { isPending, error, signup };
};
