export const addPost = (idUser,userName,email,userPhoto,textPost,privacy,imgPost,date) => {
  return firebase.firestore().collection('posts').add({
      idUser : idUser,
      name : userName,
      email : email,
      photo :  userPhoto,
      textPost : textPost,
      privacy : privacy,
      imgPost:imgPost,
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

export const getImagePost = (file,uploader,callback) =>{
  // Crear un storage ref
  const storageRef = firebase.storage().ref();    //
  const imageRef = storageRef.child(`img/${file.name}`)
  
  // Subir archivo
  const task = imageRef.put(file);
  return  task.on('state_changed',
    (snapshot)=>{
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;      
    },
    (error)=>(error),
    ()=>{
      const downloadImg = task.snapshot.ref.getDownloadURL()
      downloadImg.then(callback)
    }
  );
}

