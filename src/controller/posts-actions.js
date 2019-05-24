export const addLikePost = (idPost,idUser,email)=>{
    return firebase.firestore().collection('posts').doc(idPost).collection('likes').doc(idUser).set({
      idUser : idUser,
      emailUser : email,
      idPost : idPost
    });
}

export const deleteLikePost = (idPost,idLike)=>{
  return firebase.firestore().collection('posts').doc(idPost).collection('likes').doc(idLike).delete();
}

export const getAllPostLikes = (idPost,callback)=>{
  firebase.firestore().collection('posts').doc(idPost).collection('likes').onSnapshot(querySnapshot =>{
    const likes = []
    querySnapshot.forEach((doc) => {
      likes.push({id:doc.id,...doc.data()});                
    });
    callback(likes);
  })
}

