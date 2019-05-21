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

/******************************  DATOS DE USUARIO **********************************/

export const setUser = (uid,userName,email,userPhoto)=>{
  return firebase.firestore().collection('users').doc(uid).set({
    idUser: uid,
    name: userName,
    email: email,
    photo: userPhoto,
    birthdate : null,
    infoPersonal:null,
    infoDoramas:null
  })
}

export const getUser = (id,callback) =>{
  firebase.firestore().collection("users").doc(id)
    .onSnapshot(doc => {
      const data = doc.data();
      callback(data)
    });     
}

export const updateUser = (idUser , dataUser ) =>{
  return firebase.firestore().collection('users').doc(idUser).update(dataUser);
}

/************************************** POST  ******************************************/
export const addNote = (idUser,userName,userPhoto,textPost,privacy,date) => {
  return firebase.firestore().collection('posts').add({
    idUser : idUser,
    name : userName,
    photo :  userPhoto,
    textPost : textPost,
    privacy : privacy,
    date : date,
    likes :0,
    });
}

export const getAllPosts = (callback)=>{
  firebase.firestore().collection('posts').orderBy("date","desc").onSnapshot((querySnapshot)=>{
    const posts =[];
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().date}`);
        posts.push({id: doc.id,...doc.data()});                
      });
       // console.log(posts)
      callback(posts);
    })
}


export const getPublicPosts = (callback)=>{
  firebase.firestore().collection('posts').where("privacy","==","Publico").orderBy("date","desc").onSnapshot(querySnapshot=>{
    let posts =[];
    querySnapshot.forEach((doc) => {
       posts.push({id: doc.id,...doc.data()});                
      });
      callback(posts);
    })
}

export const deleteNote = (idNote)=>{
  return firebase.firestore().collection('posts').doc(idNote).delete();
}

export const updateNote = (idNote , note ) =>{
  return firebase.firestore().collection('posts').doc(idNote).update(note);
}