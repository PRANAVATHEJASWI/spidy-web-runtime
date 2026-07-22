import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

// Client-side Firebase configuration.
// If backend is down, we connect directly using these credentials.
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'pranava-ff75b',
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Initialize Firebase
let db = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error('Failed to initialize Firebase client SDK:', error);
}

/**
 * Fetches resume details directly from Firestore.
 */
export async function fetchResumeFromFirebase() {
  if (!db) throw new Error('Firebase Firestore client is not initialized');
  const docRef = doc(db, 'resume', 'default');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error('Resume document "default" not found in Firestore.');
}

/**
 * Fetches blog posts directly from Firestore.
 */
export async function fetchBlogsFromFirebase() {
  if (!db) throw new Error('Firebase Firestore client is not initialized');
  const querySnapshot = await getDocs(collection(db, 'blogs'));
  const blogs = [];
  querySnapshot.forEach((doc) => {
    blogs.push({
      id: doc.id,
      ...doc.data()
    });
  });
  // Sort blogs descending by date, matching backend sorting logic
  return blogs.sort((a, b) => {
    const dateA = a.date || '';
    const dateB = b.date || '';
    return dateB.localeCompare(dateA);
  });
}
