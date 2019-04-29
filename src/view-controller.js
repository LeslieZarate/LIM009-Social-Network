import { signIn ,signInGoogle ,signInFacebook,signUp} from "./controller/controller-firebase.js";

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
      .catch(() => {})
}

  // Funcion de Login con GOOGLE
export const signInGoogleOnSubmit = () => {
  signInGoogle()
    .then(() => changeHash('/home'))
    .catch(() => {})
}
  // Funcion de Login FACEBOOK
export const signInFacebookOnSubmit = () => {
	signInFacebook()
		.then(() => changeHash('/home'))
		.catch(() => {})
}


// funcion de Crear cuenta 

export const signUpSubmit = (event) =>{
	event.preventDefault()
	const email = document.querySelector('#email');
	const password = document.querySelector('#password');
	const name = document.querySelector('#name').value;
	
	signUp(email.value,password.value)	
		.then(()=>changeHash('/signIn'))
		.catch(() => {})
}