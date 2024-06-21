import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'; // or 'firebase/firestore' for Firestore

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  // Add other Firebase config properties
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
