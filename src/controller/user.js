export const setUser = (uid,userName,email,userPhoto)=>{
    return firebase.firestore().collection('users').doc(uid).set({
      idUser: uid,
      name: userName,
      email: email,
      photo: userPhoto,
      birthdate : null,
      infoPersonal:null,
      infoDoramas:null
  });
}
  
export const getUser = (id,callback) =>{
  firebase.firestore().collection("users").doc(id)
    .onSnapshot(doc => {
      const data = doc.data();
      callback(data)
      //callback(doc)
  });     
}
  
export const updateUser = (idUser , dataUser ) =>{
  return firebase.firestore().collection('users').doc(idUser).update(dataUser);
}


//export const userActive = (callback) => firebase.auth().onAuthStateChanged(callback)