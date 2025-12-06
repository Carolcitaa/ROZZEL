// main.js (tipo módulo)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// -----------------
// CONFIG FIREBASE
// -----------------
const firebaseConfig = {
  apiKey: "AIzaSyBiCjbzRY9I6rkVK-VW4JnF1e3WS2PC1O8",
  authDomain: "testuno-9f791.firebaseapp.com",
  projectId: "testuno-9f791",
  storageBucket: "testuno-9f791.firebasestorage.app",
  messagingSenderId: "283332297981",
  appId: "1:283332297981:web:500aa57d03f12e056e2a94",
  measurementId: "G-MQEC0Y7G2G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -----------------
// MANEJAR FORMULARIO
// -----------------
const form = document.getElementById("quick-book");
const submitBtn = document.getElementById("submit-btn");

if (!form) {
  console.error("No se encontró el formulario #quick-book en el DOM.");
} else {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Desactivar botón para evitar múltiples envíos
    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
    }

    // Recolectar datos
    const data = {
      nombre: e.target.nombre?.value || "",
      telefono: e.target.telefono?.value || "",
      email: e.target.email?.value || "",
      servicio: e.target.servicio?.value || "",
      fecha: e.target.fecha?.value || "",
      hora: e.target.hora?.value || "",
      fechaRegistro: new Date().toISOString()
    };

    try {
      // Agrega documento a la colección "registro-client-web"
      const docRef = await addDoc(collection(db, "registro-client-web"), data);
      console.log("Documento agregado con ID:", docRef.id);

      // Mensaje al usuario y limpiar formulario
      alert("Registro enviado correctamente ✅");
      form.reset();
    } catch (err) {
      console.error("Error guardando en Firestore:", err);
      alert("Ocurrió un error al enviar. Revisa la consola.");
    } finally {
      // Reactivar botón
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Solicitar";
      }
    }
  });
}
// -------------------------
// FORMULARIO DE CONTACTO
// -------------------------
const btnEnviar = document.getElementById("btnEnviar");

if (!btnEnviar) {
  console.error("❌ No se encontró el botón #btnEnviar en el DOM.");
}

btnEnviar.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Debes llenar todos los campos.");
    return;
  }

  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando...";

  try {
    await addDoc(collection(db, "contact-info"), {
      nombre: name,
      email: email,
      mensaje: message,
      fecha: new Date().toISOString()
    });

    alert("Mensaje enviado correctamente 🎉");

    // Limpiar formulario
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

  } catch (err) {
    console.error("Error al enviar:", err);
    alert("Error al enviar el mensaje. Intenta más tarde.");
  }

  btnEnviar.disabled = false;
  btnEnviar.textContent = "Enviar";
});