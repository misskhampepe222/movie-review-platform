import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-9CuEovKhMgXzgLbpesHqLJASDjadVAE",
  authDomain: "movie-review-platform-3fef3.firebaseapp.com",
  projectId: "movie-review-platform-3fef3",
  storageBucket: "movie-review-platform-3fef3.firebasestorage.app",
  messagingSenderId: "1058540497259",
  appId: "1:1058540497259:web:48db794f5af4d305ba842e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;