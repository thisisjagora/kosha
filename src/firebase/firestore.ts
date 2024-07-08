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

export const getBookings = async (date: string) => {
  try{
    const q = query(collection(db, FIREBASE_COLLECTIONS.BOOKINGS), where("bookingDate", "==", date));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Document with the same bookingId already exists.");
    }
  }catch(err){
    throw err;
  }

}


// For conversations 
// - Fetch conversations from chat collections
// - Filter by currentUserLoggedIn user id
// - Fetch recipient user profile from user's collection
// - Fetch latest message from chat_messages collection using the chat id gotten from conversations query.