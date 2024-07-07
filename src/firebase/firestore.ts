import { collection, getFirestore, addDoc, getDocs, where, query } from "firebase/firestore";
import firebaseApp from "./config";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";
import { Booking } from "@/types/structs";

export const db = getFirestore(firebaseApp);

export const addToBookings = async (payload: Booking) => {
  try {
    const q = query(collection(db, FIREBASE_COLLECTIONS.BOOKINGS), where("bookingId", "==", payload.bookingId));
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error("Document with the same bookingId already exists.");
    }

    const res = await addDoc(collection(db, FIREBASE_COLLECTIONS.BOOKINGS), payload);
    return res;
  } catch (err) {
    throw err;
  }
};
