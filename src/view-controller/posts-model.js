import { addPost,deletePost,updateTextPost,updatePrivacyPost, getImagePost} from "../controller/post.js";
import {currentUser} from "../controller/auth.js"
import {userData} from "./user-model.js"

let newimage = ''
export const getImage = (file) => {
  getImagePost(file[0], downloadURL => {
    console.log('available at', downloadURL);
    if (file.length !== 0) {
      newimage = downloadURL
    }
  })
}

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

export  const addPostSubmit = (textPost,privacy,file) =>{
  const fullDate= new Date();
  const date = systemDate(fullDate); 
  const user = firebase.auth().currentUser;
  let photoImg = ''
  if (file !== 0) {
    photoImg = newimage
  };
  addPost(user.uid,user.displayName,user.email,user.photoURL,textPost,privacy,date,photoImg)
  
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






