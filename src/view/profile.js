import {getUser} from '../controller/controller-firebase.js'

export default () => {
  //const userProfile = document.createElement('main');
  const user = firebase.auth().currentUser;  
  getUser(user.uid,templateUser);
   
  /*
  const docRef = firebase.firestore().collection('users').doc(user.uid);  
  docRef.get()
    .then(doc=>{
      const profileContent = `
          <div>
            <h1>Perfil del Usuario</h1>
            <p>${doc.data().name}</p>
            <img src= '${doc.data().photo}'/>            
          </div>        
          `;
        userProfile.innerHTML = profileContent;       
    })
    .catch(e=>console.log(e.message)) */

  //return userProfile;  

}

export const templateUser = (data)=>{
  const userProfile = document.createElement('main');
  const profileContent = `
            <div>
              <h1>Perfil del Usuario</h1>
              <p>${data.name}</p>
              <img src= '${data.photo}'/>
              
            </div>        
            `;
    userProfile.innerHTML = profileContent

    return userProfile;
}
