import { updateUserPerfil } from "../view-controller.js"
export default (user) => {
  const profile = document.createElement('main');
 
  const profileContent = `
   
          <div class = "container-perfil">
          ${user !==  undefined
            ?`
            <div id="describe-perfil" class="describe-perfil ">
              <h1 class="color-perfil text-center">Perfil del Usuario</h1>
              <img class="img-perfil-user" src= '${user.photo}'/>                          
              <p class="item-perfil"><strong> Nombre:</strong>${user.name}</p>
              <p class="item-perfil"><strong> Email:</strong>${user.email}</p> 
              <p class="item-perfil"><strong> Fecha de Nacimiento :</strong>${user.birthdate}</p> 
              <p class="item-perfil"><strong> Información Personal:</strong>${user.infoPersonal}</p>
              <p class="item-perfil"><strong> Doramas Favoritos:</strong>${user.infoDoramas}</p> 

              <div class="form-groups">
                <button id="editPerfil-${user.idUser}">Editar</button>
						  </div>       
             
            </div> 


          <div id="edit-perfil" class="edit-perfil p2 display-none">
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
            : ``}            
              
          </div> 
  
  `;

  profile.innerHTML=profileContent;
  if(user!== undefined){
    const btnEditPerfil = profile.querySelector(`#editPerfil-${user.idUser}`)
    btnEditPerfil.addEventListener('click',updateUserPerfil)
  }
  return profile;
}









/*

import { updateUserPerfil } from "../view-controller.js"
export default (user) => {
  console.log(user)
  const profile = document.createElement('main');
 
  const profileContent = `
          <div> 
          ${user !== undefined
            ?
            
            ` <div id="describe-perfil" class="describe-perfil">
                <h1>Perfil del Usuario</h1>
                <p><strong>Foto de Perfil:</strong></p>
                <img src= '${user.photo}' width="100px"/>
                <p><strong> Nombre:</strong>${user.name}</p>
                <p><strong> email:</strong>${user.email}</p> 

                <button id="editPerfil-${user.idUser}">Editar</butoon>
              </div>

              <div id="edit-perfil" class="display-none">
            <div>
            <img src= '${user.photo}' width="100px"/>
            <br>
            <button id="editPhoto-${user.idUser}">Subir Imagen</button>
            </div>
              <form>
                <div class="form-group">
                  <label  for="name">Nombre</label>
                  <input class="form-control" id="name" type="text"  value="${user.name}"/>
                  <p>${user.email}</p>
                </div>
                <div class="form-group">
                  <label for="date">Fecha de Nacimiento</label>
                  <input id="date" type="date" value="">
                </div>
                <div class="form-group">
                  <label for="info-personal">Informacion sobre ti </label>
                  <textarea id="info-personal"  placeholder="Escribe algunos datos sobre ti">${user.infoPersonal}</textarea> 
                </div>
                <div class="form-group">
                  <label for="info-doramas">Doramas Favoritos </label>
                  <textarea id="info-doramas"  placeholder="Agrega tus doramas favoritos">${user.infoDoramas}</textarea> 
                </div>


                <div class="form-groups">
                  <button id="btn-save-perfil" type="submit">Guardar</button>
                  <button id="btn-cancel-perfil" type="submit">Cancelar</button>
                </div>                  
              </form>
        </div>

             ` 

            : `` } 

            
            
           
                     
        
              
          </div> `;

  profile.innerHTML=profileContent;
  if(user!== undefined){
  const btnEditPerfil = profile.querySelector(`#editPerfil-${user.idUser}`)
  btnEditPerfil.addEventListener('click',updateUserPerfil)
}
  return profile;         
            
}




*/