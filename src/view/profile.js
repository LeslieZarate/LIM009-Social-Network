export default (user) => {
  const profile = document.createElement('main');
 
  const profileContent = `
      <!-- SECCION PERFIL -->
      ${user != null?`
      <section class="profile-content m1 p2">
            <div class="perfil-user m1 p2">
            <img alt ='photo-perfil' src='${user.photo}' class="m1">
            <h2>${user.name}</h2>
            </div>
            `	
            : null} 			
      </section>            
  `;

  profile.innerHTML=profileContent;
  return profile;
}

