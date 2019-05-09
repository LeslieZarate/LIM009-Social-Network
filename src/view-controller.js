import { signIn ,signInGoogle ,signInFacebook,signUp ,signOut,setUser,addNote,deleteNote,updateNote, getUser,getUser2} from "./controller/controller-firebase.js";

const changeHash = (hash) =>  {
    location.hash = hash;
}

/********************** AUTENTIFICACION  **************** */
    
// Funcion de Login EMAIL Y CONTRASEÑA
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
// Funcion de Login con GOOGLE
export const signInGoogleOnSubmit = () => {
  signInGoogle()
    .then((result) => {
      const user = result.user
      user.providerData.forEach( profile =>{
        setUser(profile.uid,profile.displayName,profile.email,profile.photoURL,user.uid)
      })      
      changeHash('/home')
    })         
    .catch(error => {
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })    
}
// Funcion de Login FACEBOOK
export const signInFacebookOnSubmit = () => {
  signInFacebook()
  .then((result) => {
    const user = result.user
    user.providerData.forEach( profile =>{
      setUser(profile.uid,profile.displayName,profile.email,profile.photoURL,user.uid)
    })      
    changeHash('/home')
  })           
  .catch(error => {
    const errorCode = error.code;
    const  errorMessage = error.message;
    alert( `Error: ${errorMessage} Tipo:${errorCode}`)
  })
}
// Funcion de CREAR CUENTA 
export const signUpSubmit = (event) =>{
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const name = document.querySelector('#name').value;
  const photo =  'https://images.vexels.com/media/users/3/147101/isolated/lists/b4a49d4b864c74bb73de63f080ad7930-boton-de-perfil-de-instagram.png';

  signUp(email,password)  
    .then((result)=>{
      const user = result.user
      setUser(user.uid,name,user.email,photo,user.uid);
      signOut()     
      changeHash('/signIn');
    })
    .catch(error => {
        const errorCode = error.code;
        const  errorMessage = error.message;
        alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })
}
// Salir de la Cuenta
export const signOutSubmit = () =>{
  signOut()
  .catch(error => {
    const errorCode = error.code;
    const  errorMessage = error.message;
    alert( `Error: ${errorMessage} Tipo:${errorCode}`)
  })
} 

/********** OBTENER DATOS DEL USUARIO ****/

export const userData = (callback) =>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      getUser(user.uid).then( doc => {
        callback(doc.data())
      })
      .catch(error=>{
        const errorCode = error.code;
        const  errorMessage = error.message;
        alert( `Error: ${errorMessage} Tipo:${errorCode}`)
      })
    }else{
      console.log('usuario no activo Perfil')
    }

    
  });
}
export const userData2 = (callback) =>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      getUser2(user.uid,callback)
    } else{
      console.log('usuario no activo Perfil')
    }
  })  
}
// OBSERVADOR 
export const  observer = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log('Usuario activo: '+ user.email )
    }else{
      console.log('usuario no activo Observador ')
    }    
  }) 
}

/********************** POST  **************** */

export  const addNoteSubmit = (event) =>{
  event.preventDefault();
  const privacy = document.querySelector('#options-privacy').value;  
  const textPost = document.querySelector('#text-post');
  userData((doc)=>{
    if(textPost.value  === ''){
      alert('Escribe algo ')
    }
    else{
      addNote(doc.name,doc.photo,textPost.value,privacy)
      .then(()=>{
        alert('mensaje agregado')
        textPost.value = '';
        
      })
      .catch(error => {
        const errorCode = error.code;
        const  errorMessage = error.message;
        alert( `Error: ${errorMessage} Tipo:${errorCode}`)
      })
    }

  });

/*

  const user = firebase.auth().currentUser;
  const userName = user.displayName;
  const userPhoto = user.photoURL;  
  const privacy = document.querySelector('#options-privacy').value;  
  const textPost = document.querySelector('#text-post');

  if(textPost.value  === ''){
    alert('Escribe algo ')
  }
  else{
    addNote(userName,userPhoto,textPost.value,privacy)
    .then(()=>{
      alert('mensaje agregado')
      textPost.value = '';
      
    })
    .catch(error => {
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })
  } */

}

export const deleteNoteSubmit = (event) =>{
    event.preventDefault();
    console.log(event.target.id);
    deleteNote(event.target.id)
    .then(()=>{
      console.log('se elimino exitosamente')
    })
    .catch(error => {
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })
}

export const updateNoteSubmit = (event) => {
  const btnId = event.target.id;
  const idNote = btnId.substr(9,btnId.length-9) // Identificar que post vamos a actualizar 
  const textNote = document.querySelector(`#post-${idNote}`)
  textNote.readOnly = false;  
  const btnSave = document.querySelector(`#btn-save-${idNote}`)
  btnSave.addEventListener('click',()=>{
    const  note = {
      textPost : textNote.value
    }
    updateNote(idNote,note)
  })
}
