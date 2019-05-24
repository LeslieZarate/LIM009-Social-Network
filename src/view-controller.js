import { signIn ,signInGoogle ,signInFacebook,signUp ,signOut,setUser,addNote,deleteNote,updateNote, getUser} from "./controller/controller-firebase.js";

const changeHash = (hash) =>  {
    location.hash = hash;
}

/*****************************  AUTENTIFICACION  *************************/
    
// LOGIN - EMAIL Y CONTRASEÑA
export const signInOnSubmit = (event) => {
  event.preventDefault()
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;  
  signIn(email, password)
    .then(() => {
      changeHash('/dramaFever')
    })
    .catch(error => {
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })
}
// LOGIN - GOOGLE
export const signInGoogleOnSubmit = () => {
  signInGoogle()
    .then((result) => {
      const user = result.user;      
      setUser(user.uid,user.displayName,user.email,user.photoURL,user.uid)         
      changeHash('/dramaFever')
    })         
    .catch(error => {
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })    
}
// LOGIN - FACEBOOK
export const signInFacebookOnSubmit = () => {
  signInFacebook()
  .then((result) => {
    const user = result.user;      
      setUser(user.uid,user.displayName,user.email,user.photoURL,user.uid)         
      changeHash('/dramaFever')
  })           
  .catch(error => {
    const errorCode = error.code;
    const  errorMessage = error.message;
    alert( `Error: ${errorMessage} Tipo:${errorCode}`)
  })
}
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
// CERRAR SESION
export const signOutSubmit = () =>{
  signOut()
  .then(()=>changeHash('/signIn'))
  .catch(error => {
    const errorCode = error.code;
    const  errorMessage = error.message;
    alert( `Error: ${errorMessage} Tipo:${errorCode}`)
  })
} 

/************************ OBTENER DATOS DEL USUARIO *************************/
export const userData = (callback) =>{ debugger
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      getUser(user.uid,callback)
    } else {
      callback(user)
    }
  }) 
}
// OBSERVADOR 
/*
export const  observer = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log(`OBSERVADOR : USUARIO ACTIVO ${user.email}`)
    }else{
      console.log(' OBSERVADOR : USUARIO NO ACTIVO')
    }    
  }) 
}
*/
/*
export const userData2 = (callback) =>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      getUser(user.uid).then( doc => {
        console.log('hola')
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
*/

/************************************  POST *****************************************/

export  const addNoteSubmit = (event) =>{
  event.preventDefault();
  const privacy = document.querySelector('#options-privacy').value;  
  const textPost = document.querySelector('#text-post');
  if(textPost.value  === ''){
    alert('Escribe algo ')
  }
  else{
    userData((doc)=>{ 
      addNote(doc.idUser,doc.name,doc.photo,textPost.value,privacy)
      .then(()=>{
        alert('mensaje agregado')
        textPost.value = '';        
      })
      .catch(error => {
        const errorCode = error.code;
        const  errorMessage = error.message;
        alert( `Error: ${errorMessage} Tipo:${errorCode}`)
      })
    });
  }
}

export const deleteNoteSubmit = (event) =>{ 
  event.preventDefault();
  console.log(event.target.id) 
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        getdoc(doc => {
          if(user.uid === doc.id){  
          }
        })
      }
      else{
        console.log('no hay usuario')
      } 
    })
    

  

  
  
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
  event.preventDefault()
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
