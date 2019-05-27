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

export const getUser2 = (id)=>{
  return firebase.firestore().collection('users').doc(id).get()
}

  
export const updateUser = (idUser ,name, birthdate,infoPersonal,infoDoramas ) =>{
  return firebase.firestore().collection('users').doc(idUser).update({
    name:name,
    birthdate : birthdate,
    infoPersonal:infoPersonal,
    infoDoramas:infoDoramas
  });
}

