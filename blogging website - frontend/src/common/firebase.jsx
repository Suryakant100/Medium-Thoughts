// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC3RNnSH9GhSwzlbsdMf6p9AYrmB5FH6z0",
//   authDomain: "react-js-blog-website-5f3c3.firebaseapp.com",
//   projectId: "react-js-blog-website-5f3c3",
//   storageBucket: "react-js-blog-website-5f3c3.appspot.com",
//   messagingSenderId: "694095940624",
//   appId: "1:694095940624:web:ec7a14fb0a5dcd5bfd8e95",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const provider = new GoogleAuthProvider();
// const auth = getAuth(app);

// export const authWithGoogle = async () => {
//   let user = null;
//   await signInWithPopup(auth, provider)
//     .then((result) => {
//       user = result.user;
//     })
//     .catch((err) => {
//       console.error(err);
//     });

//   return user;
// };
