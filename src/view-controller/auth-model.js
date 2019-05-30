import { signIn ,signInGoogle ,signInFacebook,signUp ,signOut} from "../controller/auth.js";
import{setUser} from "../controller/user.js"

const changeHash = (hash) =>  {
    location.hash = hash;
}

/*****************************  AUTENTIFICACION  *************************/
// CREAR CUENTA 
export const signUpSubmit = (event) =>{
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const name = document.querySelector('#name').value;
  const photo =  'https://images.vexels.com/media/users/3/147101/isolated/lists/b4a49d4b864c74bb73de63f080ad7930-boton-de-perfil-de-instagram.png';
  
  signUp(email,password)  
    .then((result)=>{
      const user = result.user
      setUser(user.uid,name,user.email,photo);     
      changeHash('/home');      
    })
    .catch(error => {
        const errorCode = error.code;
        const  errorMessage = error.message;
        alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })
}
// LOGIN - EMAIL Y CONTRASEÑA
export const signInOnSubmit = (event) => {
  event.preventDefault()
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;  
  signIn(email, password)
    .then(() => {
      changeHash('/home')
    })
    .catch(error => {
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })
}
// LOGIN - GOOGLE
export const signInGoogleOnSubmit = (event) => {
  event.preventDefault()
  signInGoogle()
  .then((result) => {
    const user = result.user;   
    const docRef = firebase.firestore().collection('users').doc(user.uid);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
          setUser(user.uid,user.displayName,user.email,user.photoURL);            
        }
    });
    changeHash('/home')
  })         
  .catch(error => {
    const errorCode = error.code;
    const  errorMessage = error.message;
    alert( `Error: ${errorMessage} Tipo:${errorCode}`)
  })    
}
// LOGIN - FACEBOOK
export const signInFacebookOnSubmit = () => {
  event.preventDefault()
  signInFacebook()
  .then((result) => {
    const user = result.user;   
    const docRef = firebase.firestore().collection('users').doc(user.uid);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
          setUser(user.uid,user.displayName,user.email,user.photoURL);            
        }
    });
    changeHash('/home')
  })           
  .catch(error => {
    const errorCode = error.code;
    const  errorMessage = error.message;
    alert( `Error: ${errorMessage} Tipo:${errorCode}`)
  })
}

// CERRAR SESION
export const signOutSubmit = (event) =>{
  event.preventDefault();
  signOut()
  .then(()=>changeHash('/signIn'))
  .catch(error => {
    const errorCode = error.code;
    const  errorMessage = error.message;
    alert( `Error: ${errorMessage} Tipo:${errorCode}`)
  })
} 


