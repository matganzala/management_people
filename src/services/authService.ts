import { getFirestore, doc, setDoc } from 'firebase/firestore';

export async function updateSessionInFirestore(user: any) {
  const db = getFirestore();
  const sessionRef = doc(db, 'sessions', 'currentSession');
  await setDoc(sessionRef, { user });
}