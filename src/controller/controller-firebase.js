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


/********************** DATOS DE USUARIO **************** */

export const setUser = (idDoc,userName,email,userPhoto,uid)=>{
  return firebase.firestore().collection('users').doc(uid).set({
    id: idDoc,
    name: userName,
    email: email,
    photo: userPhoto,
  })
}

export const getUser = (uid, tempUser) =>{
  firebase.firestore().collection('users').doc(uid).get()  
  .then(doc=> {
    tempUser(doc.data())
    console.log(doc.data())
  })
}

/********************** POST  **************** */
  /*export const addNote = (userName,userPhoto,textPost,privacy) => {
    return firebase.firestore().collection('posts').add({
      name : userName,
      photo :  userPhoto,
      textPost : textPost,
      privacy : privacy,
      date : Date(),
      likes :0,
    });
  }*/

  //Crear notas
export const addNote = (post,userName)=> {
  return firebase.firestore().collection('post').add({
      note: post,
      name : userName,
  })
}

//Leer notas
export const readNotes =(data)=>{
  firebase.firestore().collection('post').onSnapshot((querySnapshot)=>{
      const posts =[];
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          posts.push({id: doc.id,...doc.data()});
      });
      data(posts);
  })
}