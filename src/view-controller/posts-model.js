import { addPost,deletePost,updateTextPost,updatePrivacyPost} from "../controller/post.js";
import {currentUser} from "../controller/auth.js"
import {userData} from "./user-model.js"



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

export  const addPostSubmit = (textPost,privacy) =>{
  const fullDate= new Date();
  const date = systemDate(fullDate); 
  const user = firebase.auth().currentUser;
  //addPost(user.uid,user.displayName,user.email,user.photoURL,textPost,privacy,date)
    userData(doc =>{
      addPost(doc.idUser,doc.name,doc.email,doc.photo,textPost,privacy,date)
    });

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






