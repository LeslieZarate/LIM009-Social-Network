// LOGIN CON EMAIL -PASSWORD
export const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

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
export const signUp = (email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}
// Cerrar Sesión
export const signOut = () => firebase.auth().signOut();

/********************** POST  **************** */
  export const addNote = (userName,userPhoto,textPost,privacy) => {
    return firebase.firestore().collection('posts').add({
      name : userName,
      photo :  userPhoto,
      textPost : textPost,
      privacy : privacy,
      date : Date(),
      likes :0,
    });
  }