// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBhbXHBjfRyVP9evr7gVUmuwThim-0rtiQ',
	authDomain: 'wellbudz.firebaseapp.com',
	databaseURL: 'https://wellbudz-default-rtdb.firebaseio.com',
	projectId: 'wellbudz',
	storageBucket: 'wellbudz.appspot.com',
	messagingSenderId: '709504683358',
	appId: '1:709504683358:web:c0695d51c45987ec4dd3cf',
	measurementId: 'G-06BHJ8YEMB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;