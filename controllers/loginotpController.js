import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  // ... your config ...
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPhoneNumber, RecaptchaVerifier };
