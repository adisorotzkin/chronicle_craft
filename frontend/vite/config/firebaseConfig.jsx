import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCtGCo0dW5DIAd9bRkxNd50_js7J-qULzA",
  authDomain: "chroniclecraft-ee060.firebaseapp.com",
  projectId: "chroniclecraft-ee060",
  storageBucket: "chroniclecraft-ee060.appspot.com",
  messagingSenderId: "968432437049",
  appId: "1:968432437049:web:e22e10654b711eba830ae8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};