import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBhbXHBjfRyVP9evr7gVUmuwThim-0rtiQ",
  authDomain: "wellbudz.firebaseapp.com",
  databaseURL: "https://wellbudz-default-rtdb.firebaseio.com",
  projectId: "wellbudz",
  storageBucket: "wellbudz.appspot.com",
  messagingSenderId: "709504683358",
  appId: "1:709504683358:web:c0695d51c45987ec4dd3cf",
  measurementId: "G-06BHJ8YEMB"
};
const app = initializeApp(firebaseConfig);
export {
  app as default
};
