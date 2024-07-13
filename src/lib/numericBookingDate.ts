import { db } from "@/firebase/firestore";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { safeParseDate } from "@/lib/utils";

export async function updateFieldFormat(
  collectionName: string,
  fieldName: string,
  transformFunction: (value: unknown) => unknown
) {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);

  querySnapshot.forEach((documentSnapshot) => {
    const docRef = doc(db, collectionName, documentSnapshot.id);
    const oldFieldValue = documentSnapshot.get(fieldName);
    const newFieldValue = transformFunction(oldFieldValue);

    batch.update(docRef, {
      [fieldName]: newFieldValue as typeof oldFieldValue,
    });
  });

  // Commit the batch
  await batch.commit();
  // console.log("Field format updated for all documents.");
}

export function transformToNumericTimestamp(oldDate: unknown) {
  return safeParseDate(oldDate)?.getTime() ?? oldDate;
}

// USAGE
// updateFieldFormat("bookings", "bookingDate", transformToNumericTimestamp)
//   .then(() => console.log("Update complete."))
//   .catch((error) => console.error("Error updating documents: ", error));
