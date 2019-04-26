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
}
 init();

// LOGIN CON GOOGLE
const  provider = new firebase.auth.GoogleAuthProvider();
const authGoogle = document.getElementById('auth-google');  // boton 
const root = document.getElementById('root');

authGoogle.addEventListener('click',()=>{
  firebase.auth().signInWithPopup(provider) 
    .then(result => {
        console.log(result.user)
        saveUserGoogle(result.user);
        root.innerHTML =`
        <div>
        <h1>${result.user.displayName}</h1>
        <img src='${result.user.photoURL}'/>
        <div>
        `;
      })
    .catch(e => console.log(e.message))
});

const saveUserGoogle = (user) =>{
  const usuario  = {
    uid : user.uid,
    name : user.displayName,
    email:user.email,
    photo : user.photoURL
  }
  firebase.database().ref("usuarios/"+ user.uid).set(usuario)
};










 /*

// Aqui estoy leyendo la base de datos
firebase.database().ref('usuarios')
.on('child_added',snap => {
    let user = snap.val();
    root.innerHTML +=`<img width="100px" src='${user.photo}'/>`;
});

*/



