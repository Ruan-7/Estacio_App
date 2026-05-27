import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCty0zQFvwnxZQ5RLix_53wmItJHYRtxxQ",
  authDomain: "pet-rescue-app-12201.firebaseapp.com",
  projectId: "pet-rescue-app-12201",
  storageBucket: "pet-rescue-app-12201.firebasestorage.app",
  messagingSenderId: "124550065608",
  appId: "1:124550065608:web:15e3fadc64e2708f76a4fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);