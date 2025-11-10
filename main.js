  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBiCjbzRY9I6rkVK-VW4JnF1e3WS2PC1O8",
    authDomain: "testuno-9f791.firebaseapp.com",
    projectId: "testuno-9f791",
    storageBucket: "testuno-9f791.firebasestorage.app",
    messagingSenderId: "283332297981",
    appId: "1:283332297981:web:500aa57d03f12e056e2a94",
    measurementId: "G-MQEC0Y7G2G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  //Elementos HTML
  const btnEnviar = document.querySelector("#btnEnviar");
  const inputName = document.querySelector("#name");
  const inputEmail = document.querySelector("#email");
  const inputMessage = document.querySelector("#message");

  //Formalio Regisrtro
  const ID = document.querySelector("#ID");
  const name= document.querySelector("#name");
  const description= document.querySelector("#description");
  const category= document.querySelector("#category");
  const size= document.querySelector("#size");
  const price= document.querySelector("#price");
  const image= document.querySelector("#image");

  btnEnviar.addEventListener("click", async function() {
await setDoc(doc(db, "Clientes",inputEmail.value ), {
  name: inputName.value,
  message: inputMessage.value,
});
  })

  btnEnviar.addEventListener("click", async function() {
await setDoc(doc(db, category.value, ID.value ), {
  name: inputName.value,
  message: inputMessage.value,
});
  })