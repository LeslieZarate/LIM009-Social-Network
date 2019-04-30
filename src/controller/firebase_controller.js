// Logeo con email-password
export const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

// LOGIN CON GOOGLE
export const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

// LOGIN CON FACEBOOK
export const signInFacebook = ()=>{
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

// CREAR CUENTA 
export const signUp = (email,password,name)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
}

  // Cerrar Sesión
  export const singOut =() => 
    firebase.auth().signOut()