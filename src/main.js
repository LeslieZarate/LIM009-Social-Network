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

 const generalContainer =document.getElementById("general-container"); // Se mostrara todo

// GUARDA SESION DE TODOS LOS INICIOS DE SESION 
 const saveUser = (user) =>{
  const usuario  = {
    uid : user.uid,
    name : user.displayName,
    email:user.email,
    photo : user.photoURL
  }
  firebase.database().ref("usuarios/"+ user.uid).set(usuario)
};


// vera si el usuario Inicio sesion 
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
    });
};
observador()



// REGISTRAR NUEVO USUARIO 
const singUp = document.getElementById('sing-up');
const formRegister = document.getElementById('form-register'); 
const formLogin = document.getElementById('form-login'); 
singUp.addEventListener('click', () => {
    formRegister.style.display = "block";
    formLogin.style.display = "none";
    

});

//LOGIN EMAIL-PASSWORD
const btnLogin =document.getElementById("btn-login");
const email = document.getElementById("email");
const password =document.getElementById("password");

btnLogin.addEventListener('click',()=>{
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(result => {
    console.log(result.user)
    saveUser(result.user);
    generalContainer.innerHTML =`
    <div>
    <h1>${result.user.email}</h1>
    <img src='${"https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png "}'/>
    <div>
    `;
  })
  .catch(error => console.log(error.message));
});


// LOGIN CON GOOGLE
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const btnGoogle = document.getElementById('btn-google');  // boton Google

btnGoogle.addEventListener('click',()=>{
  firebase.auth().signInWithPopup(providerGoogle) 
    .then(result => {
        console.log(result.user)
        saveUser(result.user);
        generalContainer.innerHTML =`
        <div>
        <h1>${result.user.displayName}</h1>
        <img src='${result.user.photoURL}'/>
        <div>
        `;
      })
    .catch(e => console.log(e.message))
});


// LOGIN CON FB
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const btnFacebook = document.getElementById('btn-facebook');  // boton Facebook

btnFacebook.addEventListener('click',()=>{
  firebase.auth().signInWithPopup(providerFacebook) 
    .then(result => {
        console.log(result.user)
        saveUser(result.user);
        generalContainer.innerHTML =`
        <div>
        <h1>${result.user.displayName}</h1>
        <img src='${result.user.photoURL}'/>
        <div>
        `;
      })
    .catch(e => console.log(e.message))
});

/*

// Aqui estoy leyendo la base de datos
firebase.database().ref('usuarios')
.on('child_added',snap => {
    let user = snap.val();
    root.innerHTML +=`<img width="100px" src='${user.photo}'/>`;
});

*/



