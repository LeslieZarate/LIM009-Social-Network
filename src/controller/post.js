export const addNote = (idUser,userName,email,userPhoto,textPost,privacy,date) => {
    return firebase.firestore().collection('posts').add({
      idUser : idUser,
      name : userName,
      email : email,
      photo :  userPhoto,
      textPost : textPost,
      privacy : privacy,
      date : date,
      likes :0,
      });
  }
  
  export const deleteNote = (idNote)=>{
    return firebase.firestore().collection('posts').doc(idNote).delete();
  }
  
  export const updateNote = (idNote , note ) =>{
    return firebase.firestore().collection('posts').doc(idNote).update(note);
  }
  
  export const addLikePost = (idPost,idUser)=>{
    return firebase.firestore().collection('posts').doc(idPost).collection('likes').add({
      idUser : idUser,
      idPost : idPost
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