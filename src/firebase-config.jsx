import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCQCFLdIyILIyGmzIfOmtPNYdgstdgbeKU",  
  authDomain: "filmzy-a00c4.firebaseapp.com",
  projectId: "filmzy-a00c4",
  storageBucket: "filmzy-a00c4.appspot.com",
  appId: "1:134206139888:web:b1126057553e38a734c135",  
  measurementId: "G-SG4JQ7X3CM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };