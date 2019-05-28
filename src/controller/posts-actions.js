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

export const addComment = (idPost,idUser,email,photo,comment)=>{
  return firebase.firestore().collection('posts').doc(idPost).collection('comments').add({
    idUser : idUser,
    emailUser : email,
    photoUser :photo,
    comment : comment
  })
}

export const deleteComment = (idPost,idComment)=>{
  return firebase.firestore().collection('posts').doc(idPost).collection('comments').doc(idComment).delete();
}

export const updateComment = (idPost,idComment,newComment)=>{
  return firebase.firestore().collection('posts').doc(idPost).collection('comments').doc(idComment).update({
    comment : newComment
  });
}

export const getAllPostComments = (idPost,callback)=>{
  firebase.firestore().collection('posts').doc(idPost).collection('comments').onSnapshot(querySnapshot=>{
    const comments = [];
    querySnapshot.forEach(doc=>{
      comments.push({idPost: idPost,id:doc.id,...doc.data()});
    });
    callback(comments)
  });
}

