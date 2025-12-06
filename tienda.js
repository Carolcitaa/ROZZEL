// tienda.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Config
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
export const db = getFirestore(app);

// Guardar productos en la tienda  //

 export async function registrarProducto() {

  const nombre = document.getElementById("nombre")?.value;
  const categoria = document.getElementById("categoria")?.value;
  const descripcion = document.getElementById("descripcion")?.value;
  const tamaño = document.getElementById("tamaño")?.value;
  const precio = parseFloat(document.getElementById("precio")?.value);
  const imagenURL = document.getElementById("imagenURL")?.value;

  if (!nombre || !categoria || !descripcion || !tamaño || !precio || !imagenURL) {
    alert("Llena todos los campos.");
    return;
  }

  try {
    await addDoc(collection(db, "productos"), {
      nombre,
      categoria,
      descripcion,
      tamaño,
      precio,
      imagen: imagenURL,
      fecha: new Date()
    });

    alert("Producto registrado con éxito");

  } catch (error) {
    console.error("Error al registrar producto:", error);
    alert("Hubo un error al guardar el producto.");
  }
}

export function cargarProductos(callback) {

  onSnapshot(collection(db, "productos"), (snapshot) => {
    const lista = [];

    snapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });

    callback(lista);
  });

}
