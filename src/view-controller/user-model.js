/************************ OBTENER DATOS DEL USUARIO *************************/
import{getUser,updateUser} from "../controller/user.js"

export const userData = (callback) =>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user!= null){
      getUser(user.uid,callback)
    } else {
      callback()
    }
  }) 
}


export const  observer = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log(`OBSERVADOR : USUARIO ACTIVO ${user.email}`)
    }else{
      console.log(' OBSERVADOR : USUARIO NO ACTIVO')
    }    
  }) 
}


//  EDITAR PERFIL DEL USUARIO 

export const updateUserPerfil = (event) =>{
  const btnEdit = event.target.id;
  const idUser = btnEdit.slice(11,39);  // ID del documento de usuario a editar 
  
  const containerPerfil = document.getElementById('describe-perfil');
  containerPerfil.style.display = "none";

  const containerEditPerfil = document.getElementById('edit-perfil');
  containerEditPerfil.style.display = "block"

 
  const btnSavePerfil = document.querySelector('#btn-save-perfil')
  btnSavePerfil.addEventListener('click',(event)=>{
    event.preventDefault();
    const  infoPersonal = document.querySelector('#info-personal');
    const infoDoramas = document.querySelector('#info-doramas');
    const birthdate =document.querySelector('#birthdate');
    const name = document.querySelector('#name');
    const dataUser ={
      name: name.value,    
      birthdate : birthdate.value,
      infoPersonal:infoPersonal.value,
      infoDoramas:infoDoramas.value,
    }
    
    updateUser(idUser , dataUser);
    alert('se actualizo perfil');
    containerEditPerfil.style.display = "none";
    containerPerfil.style.display = "block";
  })

}