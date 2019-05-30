import { addPost,deletePost,updateTextPost,updatePrivacyPost,getImagePost} from "../controller/post.js";
import {currentUser} from "../controller/auth.js";
//import {userData} from "./user-model.js"

const validate = (number) => {
  if(number<=9){
    number ="0"+number;
  }
  return number 
}
const systemDate = (fullDate )=>{
  const getDate = validate(fullDate.getDate());
  const getMonth = validate(fullDate.getMonth()+1);
  const getFullYear = fullDate.getFullYear()
  
  const minutes =  validate(fullDate.getMinutes());
  const seconds =  validate(fullDate.getSeconds());
  let  hours = validate(fullDate.getHours());
  
  const myClock = `${hours}:${minutes}:${seconds}`;
  const day = `${getDate}/${getMonth}/${getFullYear}`;
  const date = `${day} - ${myClock}`
  return date;  
}

let imgURL;
export const getImageLink = (file,uploader) =>{  
  getImagePost (file,uploader,imgLink=>{
    imgURL=imgLink
  });
}

export  const addPostSubmit = (textPost,privacy,imgPost) =>{

  const uploader = document.querySelector(`#uploader`); 
  uploader.classList.remove('display-none')
 
  const fullDate= new Date();
  const date = systemDate(fullDate); 
  const user = firebase.auth().currentUser;  
  if(imgPost === 0){
    addPost(user.uid,user.displayName,user.email,user.photoURL,textPost,privacy,imgPost,date)
  }else{
    addPost(user.uid,user.displayName,user.email,user.photoURL,textPost,privacy,imgURL,date)
    uploader.value = 0;
  }
   /* const cb = doc =>{
      if(doc != null)
      addPost(doc.idUser,doc.name,doc.email,doc.photo,textPost,privacy,date)
  }
  userData(cb)
 */ 
}

export const deletePostSubmit = (objPost) =>{ 
  if(currentUser().uid === objPost.idUser){
    deletePost(objPost.id)
  }
}

export const updatePrivacyPostSubmit = (objPost ,newPrivacy) => {
  if(currentUser().uid === objPost.idUser){
  updatePrivacyPost(objPost.id ,newPrivacy)
  }
}

export const updateTextPostSubmit = (objPost ,inputPost ) => {
  if(currentUser().uid === objPost.idUser){
  updateTextPost(objPost.id ,inputPost ) 
  }
}






