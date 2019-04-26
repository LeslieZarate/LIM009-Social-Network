// Punto de entrada de la aplicacion
import { init } from "./router.js";

const init = () => {

// Inicializaciòn de Firebase
const config = {
    apiKey: "AIzaSyCiKAaY7lb-RFBBp10RSyTZmRHd1BBo90w",
    authDomain: "db-drama-fever.firebaseapp.com",
    databaseURL: "https://db-drama-fever.firebaseio.com",
    projectId: "db-drama-fever",
    storageBucket: "db-drama-fever.appspot.com",
    messagingSenderId: "82992397174"
  };
  firebase.initializeApp(config);
  init();
}


window.onload = init();