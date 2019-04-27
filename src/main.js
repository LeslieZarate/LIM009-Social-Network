//Logeo de sesión
const btnAcceder=document.getElementById("btn-acceder");
const email=document.getElementById("email");
const  password=document.getElementById("password");

btnAcceder.addEventListener('click',()=>{
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(result => {
    console.log(result.user)
    saveUserGoogle(result.user);
    root.innerHTML =`
    <div>
    <h1>${result.user.email}</h1>
    <img src='${"https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png "}'/>
    <div>
    `;
  })
  .catch(error => console.log(error.message));
});

const observador= ()=>{
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("existe usuario activo")
        var displayName = user.displayName;
        var email = user.email;
        console.log(user.emailVerified);
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        console.log("usuario no activo");
        // ...
      }
    });}
  observador();

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



