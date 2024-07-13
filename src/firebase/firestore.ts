import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  where,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import firebaseApp from "./config";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";
import { Booking, Quote } from "@/types/structs";
import { toast } from "@/components/toast/use-toast";
import { getFirebaseErrorMessage } from "@/lib/helpers/getErrorMessage";
import type { FirebaseError } from "firebase/app";

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
      bookingDate: new Date().getTime(),
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
      where("bookingDate", ">=", startOfDay.getTime()),
      where("bookingDate", "<=", endOfDay.getTime()),
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

export const updateQuote = async (bookingId: string, quote: Quote) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
        where("bookingId", "==", bookingId)
      )
    );
    if (querySnapshot.empty)
      throw new Error("Booking not found", { cause: 404 });
    const docRef = doc(
      db,
      FIREBASE_COLLECTIONS.BOOKINGS,
      querySnapshot.docs[0].id
    );
    await updateDoc(docRef, {
      quote,
    });
    return quote;
  } catch (err) {
    toast({
      title: "Oops!",
      description:
        err instanceof Error && err.cause === 404
          ? err.message || err.name
          : getFirebaseErrorMessage(err as FirebaseError),
      variant: "destructive",
    });
    throw err;
  }
};

export const updateBooking = async (bookingId: string, booking: Booking) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
        where("bookingId", "==", bookingId)
      )
    );
    if (querySnapshot.empty)
      throw new Error("Booking not found", { cause: 404 });
    const docRef = doc(
      db,
      FIREBASE_COLLECTIONS.BOOKINGS,
      querySnapshot.docs[0].id
    );
    await updateDoc(docRef, {
      ...booking,
      bookingId,
    });
    return booking;
  } catch (err) {
    toast({
      title: "Oops!",
      description:
        err instanceof Error && err.cause === 404
          ? err.message || err.name
          : getFirebaseErrorMessage(err as FirebaseError),
      variant: "destructive",
    });
    throw err;
  }
};

// For conversations
// - Fetch conversations from chat collections
// - Filter by currentUserLoggedIn user id
// - Fetch recipient user profile from user's collection
// - Fetch latest message from chat_messages collection using the chat id gotten from conversations query.
