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
<<<<<<< HEAD
    return firebase.auth().signInWithPopup(provider);
=======
    firebase.auth().signInWithPopup(provider);
>>>>>>> f1ed317fc39fe53b9637793a624ff7d7fc5d4956
}

// CREAR CUENTA 
export const signUp = (email,password,name)=>{
<<<<<<< HEAD
    return firebase.auth().createUserWithEmailAndPassword(email, password)
=======
    firebase.auth().createUserWithEmailAndPassword(email, password)
>>>>>>> f1ed317fc39fe53b9637793a624ff7d7fc5d4956
}

  // Cerrar Sesión
  export const singOut =() => 
    firebase.auth().signOut()