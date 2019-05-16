import { signIn ,signInGoogle ,signInFacebook,signUp ,signOut,setUser,addNote,deleteNote,updateNote, getUser} from "./controller/controller-firebase.js";
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
export const signInGoogleOnSubmit = () => {
  signInGoogle()
    .then((result) => {
      const user = result.user;      
      setUser(user.uid,user.displayName,user.email,user.photoURL)         
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
  signInFacebook()
  .then((result) => {
    const user = result.user;      
      setUser(user.uid,user.displayName,user.email,user.photoURL)         
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


/************************ OBTENER DATOS DEL USUARIO *************************/
export const userData = (callback) =>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user!= null){
      getUser(user.uid,callback)
    } else {
      callback()
    }
  }) 
}
// OBSERVADOR 


export const  observer = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log(`OBSERVADOR : USUARIO ACTIVO ${user.email}`)
    }else{
      console.log(' OBSERVADOR : USUARIO NO ACTIVO')
    }    
  }) 
}
/*
export const  userActivo = (callback) => {
  firebase.auth().onAuthStateChanged(callback) 
}

export const userData = (callback) =>{
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
  console.log(firebase.auth().currentUser)
  const user = firebase.auth().currentUser

  if(user != null){
    const privacy = document.querySelector('#options-privacy').value;  
    const textPost = document.querySelector('#text-post');
    if(textPost.value  === ''){
      alert('Ingresa texto')
    }else{
      userData((doc)=>{ 
        if(doc){
        addNote(doc.idUser,doc.name,doc.photo,textPost.value,privacy)
          .then(()=>{         
            textPost.value = '';        
          })
          .catch(error => {
            const errorCode = error.code;
            const  errorMessage = error.message;
            alert( `Error: ${errorMessage} Tipo:${errorCode}`)
          });
        }
      });
    }

  }else{
    alert('no estas logeado ')
  }
  
}

export const deleteNoteSubmit = (event) =>{ 
  event.preventDefault();
  console.log(event.target.id) 

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
  // editar el contenido de un post 
  const btnSave = document.querySelector(`#btn-save-${idNote}`)
  btnSave.addEventListener('click',()=>{    
    const  note = {
      textPost : textNote.value     
    }
    updateNote(idNote,note)    
  })

  // editar la privacidad del post
  const privacy = document.querySelector(`#options-${idNote}`);
  privacy.addEventListener('change',()=>{
    const privacyValue = privacy.value;
    const btnSave = document.querySelector(`#btn-save-${idNote}`)
      btnSave.addEventListener('click',()=>{    
        const  note = {
          textPost : textNote.value,
          privacy : privacyValue
        }
        updateNote(idNote,note)
      });
  });
}

export const updateLikeSubmit = (event)=>{
  event.preventDefault()  
  const idBtn = event.target.id;
  const idNote = idBtn.slice(10,30);
  console.log(idNote)
  const botonLike = document.querySelector(`#btn-likes-${idNote}`)
  const likes = parseInt(botonLike.dataset.likes)
  console.log(likes)
  const note = {
    likes : likes + 1
  }
  updateNote(idNote,note)
}