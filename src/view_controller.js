import {signIn, signInGoogle,signInFacebook,signUp}  from './controller/firebase_controller.js';

export const signInOnSubmit = (event ) =>{
    event.preventDefault()
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
      signIn(email, password)
          .then((result) => console.log(result.user))
        .catch( e => console.log(e.message) )
}

  // Funcion de Login con GOOGLE
  export const signInGoogleOnSubmit = () => {
    signInGoogle()
    .then((result) => console.log(result.user))
    .catch( e => console.log(e.message) )
  }
    // Funcion de Login FACEBOOK
  export const signInFacebookOnSubmit = () => {
      signInFacebook()
      .then((result) => console.log(result.user))
      .catch( e => console.log(e.message) )
  }

  // funcion de Crear cuenta 

export const signUpSubmit = (event) =>{
	event.preventDefault()
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
	const name = document.querySelector('#name').value;
	
	signUp(email,password)	
	   .then((result) => console.log(result.user))
      .catch( e => console.log(e.message) )
}