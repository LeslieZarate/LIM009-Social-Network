// aqui exportaras las funciones que necesites
import {signOutSubmit } from '../view-controller.js';

export default () => {
  const userProfile = document.createElement('main');
  const user = firebase.auth().currentUser;
  console.log(user);
  
/*  const profileContent = `
          <div>
            <h1>Perfil del Usuario</h1>
            <p>${user.displayName}</p>
            <img src= '${user.photoURL}'/>
            <button id="btn-signOut">Cerrar Sesion </button>
          </div>        
          `;
   userProfile.innerHTML = profileContent
   const btnSignOut = userProfile.querySelector('#btn-signOut')
          btnSignOut.addEventListener('click',signOutSubmit) */

  const docRef = firebase.firestore().collection('users').doc(user.uid);  
  docRef.get()
    .then(doc=>{
      if(doc.exists){
        const profileContent = `
          <div>
            <h1>Perfil del Usuario</h1>
            <p>${doc.data().name}</p>
            <img src= '${doc.data().photo}'/>
            
          </div>        
          `;
          userProfile.innerHTML = profileContent;
        
        }
        else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    })
    .catch(e=>console.log(e.message)) 

  return userProfile;
}
