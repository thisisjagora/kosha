import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import firebaseApp from "./config";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";
import { Booking, Chat } from "@/types/structs";
import { format } from "date-fns";

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

    const res = await addDoc(
      collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
      payload
    );
    // const { clientId, driverId } = payload;
    // await addToChats({
    //   bookingId: res.id,
    //   userIds: [clientId, driverId],
    // });
    return res;
  } catch (err) {
    throw err;
  }
};

export const addToChats = async (payload: Chat) => {
  try {
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.CHATS),
      where("bookingId", "==", payload.bookingId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Document with the same bookingId already exists.");
    }

    if (payload.userIds.length !== 2)
      throw new Error("A chat must have two users.");

    const res = await addDoc(
      collection(db, FIREBASE_COLLECTIONS.CHATS),
      payload
    );
    return res;
  } catch (err) {
    throw err;
  }
};

const extractDatePart = (date: Date): string => {
  return format(date, "M/d/yyyy");
};

export const getBookings = async (inputDate: Date) => {
  try {
    const formattedDate = extractDatePart(inputDate);
    const startOfDay = `${formattedDate} 12:00 AM`;
    const endOfDay = `${formattedDate} 11:59 PM`;

    const q = query(
      collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
      where("bookingDate", ">=", startOfDay),
      where("bookingDate", "<=", endOfDay)
    );

    const querySnapshot = await getDocs(q);

    const bookings: Array<Partial<Booking>> = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data());
    });
    return bookings.length > 0 ? bookings : [];
  } catch (err) {
    throw err;
  }
};

// For conversations
// - Fetch conversations from chat collections
// - Filter by currentUserLoggedIn user id
// - Fetch recipient user profile from user's collection
// - Fetch latest message from chat_messages collection using the chat id gotten from conversations query.
