import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import {} from "firebase/database";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";
import { ChatMessage, Chat } from "@/types/structs";
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
          } as Partial<Chat>)
      )
      .filter((booking) => booking.quote);
    return chats;
  } catch (err) {
    throw err;
  }
};

export const getChat = async (id: string) => {
  try {
    const querySnapshot = await getDoc(
      doc(db, FIREBASE_COLLECTIONS.BOOKINGS, id)
    );
    if (!querySnapshot.exists())
      throw new Error("No chat found", { cause: 404 });
    const chat = {
      id: querySnapshot.id,
      ...querySnapshot.data(),
    } as Partial<Chat>;
    return chat;
  } catch (err) {
    throw err;
  }
};

export const addToChatMessages = async (payload: Omit<ChatMessage, 'timestamp'>) => {
  try {
    const res = await addDoc(
      collection(db, FIREBASE_COLLECTIONS.CHAT_MESSAGES),
      {
        ...payload,
        timestamp: serverTimestamp(),
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const getChatMessages = async (chatId: string) => {
  try {
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.CHAT_MESSAGES),
      where("chatId", "==", chatId)
    );
    const querySnapshot = await getDocs(q);
    const chatMessages = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Partial<ChatMessage>)
    );
    return chatMessages;
  } catch (err) {
    throw err;
  }
};
