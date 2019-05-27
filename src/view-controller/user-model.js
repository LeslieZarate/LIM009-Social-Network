import{getUser,updateUser} from "../controller/user.js"
import{ userActive } from "../controller/auth.js"

export const userData = (callback) =>{
  userActive((user)=>{
    if(user!= null){
      getUser(user.uid,callback)
    } else {
      callback(null)
    }
  }) 
}

export const userData2 = (callback) =>{
  userActive(user=>{
    if(user != null){
      getUser(user.uid).then(doc=>{
        const data = doc.data();
        callback(data)
      });
    }else{
      callback()
    }
  });  
}

export const updateUserPerfil = (user,name,birthdate,infoPersonal,infoDoramas) =>{      
    updateUser(user.idUser,name ,birthdate,infoPersonal,infoDoramas);    
  }

  // se borrara despues 
export const  observer = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log(`OBSERVADOR : USUARIO ACTIVO ${user.email}`)
    }else{
      console.log(' OBSERVADOR : USUARIO NO ACTIVO')
    }    
  }) 
}