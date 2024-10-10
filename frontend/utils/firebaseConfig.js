// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCe_89CSM1HxPvcFwjOchrFRaJZ6MdD218",
  authDomain: "fixr-storage.firebaseapp.com",
  projectId: "fixr-storage",
  storageBucket: "fixr-storage.appspot.com",
  messagingSenderId: "1040509982191",
  appId: "1:1040509982191:web:798fce7417d9c243bd521a",
  measurementId: "G-EMTXLF62E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { storage };
