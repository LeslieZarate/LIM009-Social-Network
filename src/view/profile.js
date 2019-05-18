export default (user) => {
  const profile = document.createElement('main');
 
  const profileContent = `
      <!-- SECCION PERFIL -->
      ${user != null?`
          <div class="profile">
          <div class="img-perfil">
          <img src='${user.photo}' alt ='photo-perfil' class="img-profile"></div>
          <h4>${user.name}</h4>
          <p>${user.email}</p>
          <hr>
          <h3>Activity Doramas : ${user.infoDoramas}</h3>
          <p>BirthDate : ${user.birthdate}</p>
          
            <div class="redes face"><a href="https://www.facebook.com/"></a></div>
            <div class="redes twitter"><a href="https://twitter.com/?lang=es"></a></div>
            <div class="redes instagram"><a href="https://www.instagram.com/?hl=es-la"></a></div>
            <div class="redes youtube"><a href="https://www.youtube.com/"></a></div>
          <div class="boton">
              <a href="#/profile">Editar</a>
              </div> 
        </div>
    
            `	
            : null} 	          
  `;

  profile.innerHTML=profileContent;
  return profile;
}

