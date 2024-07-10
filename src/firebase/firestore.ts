import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  where,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import firebaseApp from "./config";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";
import { Booking } from "@/types/structs";

export const db = getFirestore(firebaseApp);

export const addToBookings = async (payload: Booking) => {
  try {
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
      where("bookingId", "==", payload.bookingId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Document with the same bookingId already exists.");
    }

    const res = await addDoc(collection(db, FIREBASE_COLLECTIONS.BOOKINGS), {
      ...payload,
      bookingDate: serverTimestamp(),
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const getBookings = async (inputDate: Date) => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const date = new Date(inputDate);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const q = query(
      collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
      where("bookingDate", ">=", startOfDay),
      where("bookingDate", "<=", endOfDay),
      where("clientId", "==", userId),
      where("requestType", "in", ["RegularMove", "LabourOnly"]), // Get only move and labour booking for now
      orderBy("bookingDate", "desc")
    );

    const querySnapshot = await getDocs(q);

    const bookings = querySnapshot.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Partial<Booking>)
      )
      .filter((booking) => booking.quote);
    return bookings;
  } catch (err) {
    throw err;
  }
};

// For conversations
// - Fetch conversations from chat collections
// - Filter by currentUserLoggedIn user id
// - Fetch recipient user profile from user's collection
// - Fetch latest message from chat_messages collection using the chat id gotten from conversations query.
