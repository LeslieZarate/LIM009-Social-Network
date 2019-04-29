import Login from './view/login.js'
import Account from './view/account.js'


const init = () =>{
  const config = {
      apiKey: "AIzaSyCiKAaY7lb-RFBBp10RSyTZmRHd1BBo90w",
      authDomain: "db-drama-fever.firebaseapp.com",
      databaseURL: "https://db-drama-fever.firebaseio.com",
      projectId: "db-drama-fever",
      storageBucket: "db-drama-fever.appspot.com",
      messagingSenderId: "82992397174"
    };
    firebase.initializeApp(config);  

    const root = document.getElementById('root');
    root.appendChild(Login());

}
window.onload = init();



