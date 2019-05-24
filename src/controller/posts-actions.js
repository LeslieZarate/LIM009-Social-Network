export const addLikePost = (idPost,idUser,email)=>{
    return firebase.firestore().collection('posts').doc(idPost).collection('likes').add({
      idUser : idUser,
      emailUser : email,
      idPost : idPost
    });
}

export const deleteLikePost = (idPost,idLike)=>{
  return firebase.firestore().collection('posts').doc(idPost).collection('likes').delete(idLike)
}

export const getAllPostLikes = (idPost,callback)=>{
  firebase.firestore().collection('posts').doc(idPost).collection('likes').onSnapshot(querySnapshot =>{
    const likes = []
    querySnapshot.forEac((doc) => {
      posts.push({id:doc.id,...doc.data()});                
    });
    callback(likes);
  })
}

