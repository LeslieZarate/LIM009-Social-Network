export const addPost = (idUser,userName,email,userPhoto,textPost,privacy,date) => {
    return firebase.firestore().collection('posts').add({
      idUser : idUser,
      name : userName,
      email : email,
      photo :  userPhoto,
      textPost : textPost,
      privacy : privacy,
      
      date : date,      
      });
  }
  
export const deletePost = (idPost)=>{
  return firebase.firestore().collection('posts').doc(idPost).delete();
}
  
export const updateTextPost = (idPost ,inputPost ) =>{
  return firebase.firestore().collection('posts').doc(idPost).update({
    textPost : inputPost
  });
}

export const updatePrivacyPost = (idPost ,newPrivacy) =>{
  return firebase.firestore().collection('posts').doc(idPost).update({
    privacy : newPrivacy
  });
}

export const getAllPosts = (callback)=>{
  firebase.firestore().collection('posts').orderBy("date","desc").onSnapshot((querySnapshot)=>{
    const posts =[];
    querySnapshot.forEach((doc) => {
      posts.push({id:doc.id,...doc.data()});                
    });
      callback(posts);
  })
}
  
export const getPublicPosts = (callback)=>{
    firebase.firestore().collection('posts').where("privacy","==","publico").orderBy("date","desc").onSnapshot(querySnapshot=>{
      let posts =[];
      querySnapshot.forEach((doc) => {
          posts.push({id: doc.id,...doc.data()});                
        });   
        callback(posts);
        
      })
}

