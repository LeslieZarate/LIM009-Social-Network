import { updateUserPerfil } from "../view-controller/user-model.js"
import {header} from "../view/header.js"
export default (user) => {
  const profile = document.createElement('div');
  const profileContent = `
  <header id="header-content">
  </header>
   <main>      
          <div class = "container-perfil">
          ${user != null
            
            ?`
            <div id="describe-perfil" class="describe-perfil ">
              <h1 class="color-perfil text-center">Mi Perfil</h1>
              <img class="img-perfil-user" src= '${user.photo}'/>                          
              <p class="item-perfil"><strong> Nombre:</strong>${user.name}</p>
              <p class="item-perfil"><strong> Email:</strong>${user.email}</p> 
              <p class="item-perfil"><strong> Fecha de Nacimiento :</strong>${user.birthdate}</p> 
              <p class="item-perfil"><strong> Información Personal:</strong>${user.infoPersonal}</p>
              <p class="item-perfil"><strong> Doramas Favoritos:</strong>${user.infoDoramas}</p> 

              <div class="form-groups">
                <button id="edit-perfil">Editar</button>
						  </div>       
             
            </div> 


          <div id="form-edit-perfil" class="edit-perfil p2 display-none">
            <h1 class="color-perfil text-center">Editar Perfil</h1>
            <p class="color-text text-center">${user.email}</p>
            <div>
            <img class="img-perfil-user" src= '${user.photo}'/>  
            <!--<button id="editPhoto-${user.idUser}">Subir Imagen</button>-->
            </div>
              <form>
                <div class="form-group">
                  <label  for="name">Nombre</label>
                  <input class="form-control" id="name" type="text"  value="${user.name}"/>
                  
                </div>

                <div class="form-group">
                <label for="birthdate">Fecha de Nacimiento </label>
                <input id="birthdate" type="date" value=${user.birthdate}> 
              </div>
                
                <div class="form-groups">
                  <label for="info-personal">Informacion sobre ti </label>
                  <textarea id="info-personal"  placeholder="Escribe algunos datos sobre ti">${user.infoPersonal}</textarea> 
                </div>
                <div class="form-groups">
                  <label for="info-doramas">Doramas Favoritos </label>
                  <textarea id="info-doramas"  placeholder="Agrega tus doramas favoritos">${user.infoDoramas}</textarea> 
                </div>


                <div class="form-groups">
                  <button id="btn-save-perfil" type="submit">Guardar</button>
                  <button id="btn-cancel-perfil" type="submit">Cancelar</button>
                </div>                  
              </form>
        </div> ` 
            : `Registrate`}            
              
          </div> 
  <main>
  `;

  profile.innerHTML=profileContent;

  const headerHome = profile.querySelector("#header-content")
  headerHome.appendChild(header(user));

  if(user != null){ 

    const btnEditPerfil = profile.querySelector('#edit-perfil');
    const btnSavePerfil = profile.querySelector('#btn-save-perfil')

    const containerPerfil = profile.querySelector('#describe-perfil');
    const containerEditPerfil = profile.querySelector('#form-edit-perfil');
    

    btnEditPerfil.addEventListener('click', ()=>{     
    containerPerfil.classList.add('display-none');   containerEditPerfil.classList.remove('display-none');
    });
    
    btnSavePerfil.addEventListener('click',()=>{
      const  infoPersonal = document.querySelector('#info-personal').value;
      const infoDoramas = document.querySelector('#info-doramas').value;
      const birthdate =document.querySelector('#birthdate').value;
      const name = document.querySelector('#name').value;

      updateUserPerfil(user,name,birthdate,infoPersonal,infoDoramas);
      containerPerfil.classList.remove('display-none');   containerEditPerfil.classList.add('display-none');

    });
  }
  return profile;
}




