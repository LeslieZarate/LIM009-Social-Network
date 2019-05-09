export default (doc) => {
  const profile = document.createElement('main');
  const profileContent = `
  <div>
              <h1>Perfil del Usuario</h1>
              <p>${doc.name}</p>
              <img src= '${doc.photo}'/>
              
            </div> 
  `;

  profile.innerHTML=profileContent;
  return profile;
}

