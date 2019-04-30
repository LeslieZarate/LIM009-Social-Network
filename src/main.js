import Login from './view/login.js'
<<<<<<< HEAD
//import Account from './view/account.js'
=======
import Account from './view/account.js'
>>>>>>> f1ed317fc39fe53b9637793a624ff7d7fc5d4956


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

<<<<<<< HEAD

=======
>>>>>>> f1ed317fc39fe53b9637793a624ff7d7fc5d4956
    const root = document.getElementById('root');
    root.appendChild(Login());

}
window.onload = init();



