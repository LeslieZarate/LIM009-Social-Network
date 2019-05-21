import { updateUserPerfil } from "../view-controller.js"
export default (user) => {
  const profile = document.createElement('div');
 
  const profileContent = `
    <div>
          <div>
      <!-- SECCION PERFIL -->
      ${user !==  undefined
        ?`<div class="profile">
          <div class="img-perfil">
          <img src='${user.photo}' alt ='photo-perfil' class="img-profile"></div>
          <h4>${user.name}</h4>
          <p>${user.email}</p>
          <hr>
          <h3>Informaciòn Personal : ${user.infoPersonal}</h3>
          <h3>Actividades de Doramas : ${user.infoDoramas}</h3>
          <h3>Tu Fecha de Nacimiento : ${user.birthdate}</h3>
          
            <div class="redes face"><a href="https://www.facebook.com/"></a></div>
            <div class="redes twitter"><a href="https://twitter.com/?lang=es"></a></div>
            <div class="redes instagram"><a href="https://www.instagram.com/?hl=es-la"></a></div>
            <div class="redes youtube"><a href="https://www.youtube.com/"></a></div>
          <div class="boton">
          <a id="editPerfil-${user.idUser}">Editar</a>
          </div> 
        </div>
        <div id="edit-perfil" class="profile .none">
        <div>
        <img src= '${user.photo}' class="img-profile"/>
        <br><br><br>
        <div class="boton">
        <a id="editPhoto-${user.idUser}">Subir Imagen</a>
        </div>
          <form>
            <div class="form-group">
              <label  for="name">Nombre</label>
              <input class="form-control" id="name" type="text"  value="${user.name}"/>
              <p>${user.email}</p>
            </div>

            <div class="form-group">
            <label for="birthdate">Fecha de Nacimiento </label>
            <input id="birthdate" type="date" value=${user.birthdate}> 
          </div>
            
            <div class="form-group">
              <label for="info-personal">Informacion sobre ti </label>
              <textarea id="info-personal" placeholder="Escribe algunos datos sobre ti">${user.infoPersonal}</textarea> 
            </div>
            <div class="form-group">
              <label for="info-doramas">Doramas Favoritos </label>
              <textarea id="info-doramas" placeholder="Agrega tus doramas favoritos">${user.infoDoramas}</textarea> 
            </div>


            <div class="boton">
              <a id="btn-save-perfil" type="submit">Guardar</a>
              <a id="btn-cancel-perfil" type="submit">Cancelar</a>
            </div>                  
          </form>
    </div> ` 
        : ``}            
          
      </div> 
<div>	          
            `;

            profile.innerHTML=profileContent;
            if(user!== undefined){
              const btnEditPerfil = profile.querySelector(`#editPerfil-${user.idUser}`)
              btnEditPerfil.addEventListener('click',updateUserPerfil)
            }
            return profile;
          }

