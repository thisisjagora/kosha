import { getAuth } from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";
import { Booking } from "@/types/structs";
import { db } from ".";

export const getChats = async () => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
      where("clientId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const chats = querySnapshot.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Partial<Booking & { id: string }>)
      )
      .filter((booking) => booking.quote);
    return chats;
  } catch (err) {
    throw err;
  }
};
