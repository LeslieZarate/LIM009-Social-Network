import { signIn ,signInGoogle ,signInFacebook,signUp ,signOut,setUser,addNote,deleteNote,updateNote, getUser, updateUser} from "./controller/controller-firebase.js";
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
            console.log("No such document!");
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
            console.log("No such document!");
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
  .then(()=>changeHash('/home'))
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



//  EDITAR PERFIL DEL USUARIO 

export const updateUserPerfil = (event) =>{
  const btnEdit = event.target.id;
  const idUser = btnEdit.slice(11,39);  // ID del documento de usuario a editar 
  
  const containerPerfil = document.getElementById('describe-perfil');
  containerPerfil.style.display = "none";

  const containerEditPerfil = document.getElementById('edit-perfil');
  containerEditPerfil.style.display = "block"

 
  const btnSavePerfil = document.querySelector('#btn-save-perfil')
  btnSavePerfil.addEventListener('click',(event)=>{
    event.preventDefault();
    const  infoPersonal = document.querySelector('#info-personal');
    const infoDoramas = document.querySelector('#info-doramas');
    const birthdate =document.querySelector('#birthdate');
    const name = document.querySelector('#name');
    const dataUser ={
      name: name.value,    
      birthdate : birthdate.value,
      infoPersonal:infoPersonal.value,
      infoDoramas:infoDoramas.value,
    }
    
    updateUser(idUser , dataUser);
    alert('se actualizo perfil');
    containerEditPerfil.style.display = "none";
    containerPerfil.style.display = "block";
  })

}



/************************************  POST *****************************************/

// funciones para validar la fecha 

const validate = (number) => {
  if(number<=9){
    number ="0"+number;
  }
  return number 
}

const systemDate = (fullDate )=>{
  const getDate = validate(fullDate.getDate());
  const getMonth = validate(fullDate.getMonth()+1);
  const getFullYear = fullDate.getFullYear()
  
  const minutes =  validate(fullDate.getMinutes());
  const seconds =  validate(fullDate.getSeconds());
  let  hours = validate(fullDate.getHours());
  
  const myClock = `${hours}:${minutes}:${seconds}`;
  const day = `${getDate}/${getMonth}/${getFullYear}`;
  const date = `${day} - ${myClock}`
  return date;  
}

export  const addNoteSubmit = (event) =>{
  event.preventDefault();
  const user = firebase.auth().currentUser;
  const fullDate= new Date();
  const date = systemDate(fullDate); 
  const privacy = document.querySelector('#options-privacy');  
  const textPost = document.querySelector('#text-post');

  if(textPost.value  === ''){
    alert('Ingresa texto')
  }else{    
    addNote(user.uid,user.displayName,user.photoURL,textPost.value,privacy.value,date)
      .then((doc)=>{  
        userData(user => {
          if(user!= null){
            const   data={
               name : user.name,
              photo : user.photo
          }
          updateNote(doc.id,data)
        }
        })              
        document.getElementById("form-post").reset();
        alert('Se agrego exitosamente');  
      })
      .catch(error => {
            const errorCode = error.code;
            const  errorMessage = error.message;
            alert( `Error: ${errorMessage} Tipo:${errorCode}`)
      });
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

  const messageEdit = document.querySelector(`#message-${idNote}`)
  messageEdit.style.display = "block";


  const textNote = document.querySelector(`#post-${idNote}`)
  textNote.readOnly = false;

  // editar el contenido de un post  BOTON SAVE 
  const btnSave = document.querySelector(`#btn-save-${idNote}`)
  btnSave.addEventListener('click',(event)=>{ 
    event.preventDefault()
    messageEdit.style.display = "none";  
    const  note = {
      textPost : textNote.value     
    }
    updateNote(idNote,note)    
  })

  // editar la privacidad del post BOTON SAVE 
  const privacy = document.querySelector(`#options-${idNote}`);
  privacy.addEventListener('change',(event)=>{    
    event.preventDefault()
    const privacyValue = privacy.value;
    const btnSave = document.querySelector(`#btn-save-${idNote}`)
      btnSave.addEventListener('click',(event)=>{  
        event.preventDefault()  
        messageEdit.style.display = "none";
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
  const buttonLike = document.querySelector(`#btn-likes-${idNote}`)
  const likes = parseInt(buttonLike.dataset.likes)
  console.log(likes)
  const note = {
    likes : likes + 1
  }
  updateNote(idNote,note)
}

