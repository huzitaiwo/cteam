import { useEffect, useState } from "react";
import { firebaseAuth, firebaseFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [unMounted, setUnMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign user out
    try {
      // update online status
      const { uid } = user;
      await firebaseFirestore
        .collection("users")
        .doc(uid)
        .update({ online: false });

      await firebaseAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state if not unmounted
      if (!unMounted) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      //catch error if any and if not unmounted
      if (!unMounted) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setUnMounted(true);
  }, []);

  return { isPending, error, logout };
};
