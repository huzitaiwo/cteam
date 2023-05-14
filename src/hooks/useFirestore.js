import { useReducer, useEffect, useState } from "react";
import {
  firebaseFirestore,
  firebaseStorage,
  timestamp,
} from "../firebase/config";

let initialState = {
  document: null,
  error: null,
  isPending: false,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return { isPending: true, document: null, error: null, success: null };
    case "ADD_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case "DELETE_DOCUMENT":
      return { isPending: false, document: null, error: null, success: true };
    case "UPDATE_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [unMounted, setUnMounted] = useState(false);

  // collection ref
  const ref = firebaseFirestore.collection(collection);

  // only dispatch if not unMounted
  const dispatchIfNotUnMounted = (action) => {
    if (!unMounted) {
      dispatch(action);
    }
  };

  // add document
  const addDocument = async (doc, thumbnail) => {
    if (thumbnail) {
      dispatch({ type: "IS_LOADING" });

      try {
        const createdAt = timestamp.fromDate(new Date());

        // upload project thumbnail
        const uploadPath = `projects/${thumbnail.name}`;
        const photo = await firebaseStorage.ref(uploadPath).put(thumbnail);
        const photoURL = await photo.ref.getDownloadURL();

        const addedDocument = await ref.add({ ...doc, createdAt, photoURL });
        dispatchIfNotUnMounted({
          type: "ADD_DOCUMENT",
          payload: addedDocument,
        });
      } catch (err) {
        dispatchIfNotUnMounted({ type: "ERROR", payload: err.message });
      }
    } else {
      dispatch({ type: "IS_LOADING" });

      try {
        const createdAt = timestamp.fromDate(new Date());

        const addedDocument = await ref.add({ ...doc, createdAt });
        dispatchIfNotUnMounted({
          type: "ADD_DOCUMENT",
          payload: addedDocument,
        });
      } catch (err) {
        dispatchIfNotUnMounted({ type: "ERROR", payload: err.message });
      }
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_LOADING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotUnMounted({
        type: "DELETE_DOCUMENT",
        payload: deleteDocument,
      });
    } catch (err) {
      dispatchIfNotUnMounted({ type: "ERROR", payload: "could not delete" });
    }
  };

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_LOADING" });

    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotUnMounted({
        type: "UPDATE_DOCUMENT",
        payload: updatedDocument,
      });
    } catch (err) {
      dispatchIfNotUnMounted({ type: "ERROR", payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setUnMounted(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
