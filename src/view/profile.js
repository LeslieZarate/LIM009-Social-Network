export default (user) => {
  const profile = document.createElement('main');
 
  const profileContent = `
          <div>
          ${user !== null
            ?`<h1>Perfil del Usuario</h1>
              <p>${user.name}</p>
              <img src= '${user.photo}'/>` 
            : ''}             
              
          </div> 
  `;

  profile.innerHTML=profileContent;
  return profile;
}

