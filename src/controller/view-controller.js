import { signIn ,signInGoogle ,signInFacebook,signUp} from "./controller-firebase.js";

const changeHash = (hash) =>  {
    location.hash = hash;
  }
    
  // Funcion de Login EMAIL Y CONTRASEÑA
export const signInOnSubmit = (event) => {
	event.preventDefault()
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
    signIn(email, password)
  	  .then(() => changeHash('/home'))
      .catch((e) => console.log(e.message))
}

  // Funcion de Login con GOOGLE
export const signInGoogleOnSubmit = () => {
  signInGoogle()
    .then(() => {
      const user = firebase.auth().currentUser;      
      console.log(user)
      if (user != null) {
        console.log(user.providerData)
        user.providerData.forEach( profile =>{
          console.log(profile.uid);
          console.log(user.uid);
          firebase.firestore().collection('users').doc(user.uid).set({
            id: profile.uid,
            name: profile.displayName,
            email: profile.email,
            photo: profile.photoURL,
          })
        })
      }
      changeHash('/home')
    })         
    .catch((e) => console.log(e.message))
    
}
  // Funcion de Login FACEBOOK
export const signInFacebookOnSubmit = () => {
	signInFacebook()
  .then(() => {
    const user = firebase.auth().currentUser;      
    if (user != null) {
      user.providerData.forEach( profile =>{
        firebase.firestore().collection('users').doc(user.uid).set({
          id: profile.uid,
          name: profile.displayName,
          email: profile.email,
          photo: profile.photoURL,
        })
      }) 
    }
    changeHash('/home')
    
  })         
  .catch((e) => console.log(e.message))
}


// Funcion de CREAR CUENTA 

export const signUpSubmit = (event) =>{
	event.preventDefault()
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
  const name = document.querySelector('#name').value;
 	signUp(email,password)	
		.then(()=>{
      const user = firebase.auth().currentUser;
      console.log(user);
      if(user != null){
        firebase.firestore().collection('users').doc(user.uid).set({
          id: user.uid,
          name: name,
          email: user.email,
          photo: user.photoURL,
        })
      }      
      changeHash('/signIn');
    })
		.catch(() => {})
}