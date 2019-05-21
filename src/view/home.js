import {addNoteSubmit , deleteNoteSubmit, updateNoteSubmit ,updateLikeSubmit} from "../view-controller.js"
import {getAllPosts,getPublicPosts} from "../controller/controller-firebase.js"

export default (user) => {
  console.log(user)
  const main = document.createElement('main');
  const mainContent = `
  
  
  <div class="container-home p1 ">
    <!-- SECCION PERFIL -->
    ${user!== undefined
      ?`<section class="profile-content m1 p2">
          <div class="perfil-user m1 p2">
            <img alt ='photo-perfil' src="${user.photo}" class="m1">
          <h2 class ="color-title">${user.name}</h2>
          </div>				
      </section>`
      :`<section class="profile-content  m1 p2">  
          <div class="perfil-no-user m1 p2">     
            <img alt ='photo-perfil' src="img/icon.png" class="m1">
            <h3 class ="color-title">¡No tienes cuenta,regístrate!</h3>    
          </div>   			
        </section>`}
    	

    <!-- SECCION POST -->
    <section class="posts-content m1 p2">
    <!-- FORMULARIO POST -->
    ${user !== undefined ?`<div class="form-post  p2 m1">
    <form id="form-post">
      <textarea id="text-post"  placeholder="¿Qué estas pensando?"></textarea> 
      <div class="btn-actions">
        <select id="options-privacy" class = "options-privacy" >
          <option value="publico">publico</option>
          <option value="privado">privado</option>
        </select>
        <i id="btn-img" class="fas fa-image icons m1"></i>
        <i id="btn-save" class="fas fa-paper-plane icons m1"></i>
      </div>               
    </form>					
  </div>` : ``}
      
      <!-- POSTS -->
      <h1 class ="color-text">Publicaciones </h1>
      <!-- TOTAL POST -->
      <div class="public-posts" id="public-posts">			
      </div>
    <section>
  </div>  
 `;
      
  main.innerHTML = mainContent;  
  if(user){
     const btnSave = main.querySelector('#btn-save');
     btnSave.addEventListener('click',addNoteSubmit)  
     getAllPosts(templatePost)  
 }else{
    getPublicPosts(templatePostPublic)
  }

 // getAllPosts(templatePost)
  return main  
}


export const templatePost = (data) =>{  
  const user = firebase.auth().currentUser
  let listPost = "";
     data.forEach((doc)=>{       
      const post = `
      <div class="form-post m1" id="${doc.id}">
        <div class="user-post">
          <p class ="color-text">${doc.name}</p>
          ${ user.uid === doc.idUser ? `<i id="${doc.id}" class="fas fa-window-close icons"></i>`: `` }					
        </div>
        <form class="p2">							
          <textarea id="post-${doc.id}"readonly>${doc.textPost}</textarea>
          <h3 class ="color-text" >Fecha de Publicación :${doc.date}</h3>
          <p id="message-${doc.id}" class="display-none color-diferent">Ahora puedes editar </p>
          ${ user.uid === doc.idUser 
            ?
             `<div class="btn-actions m1">
                <select id="options-${doc.id}" class = "options-privacy">
                  
                  ${doc.privacy === 'publico' 
                  ? `<option value="publico">${doc.privacy}</option>
                     <option value="privado">privado</option>`

                  :  `<option value="privado">${doc.privacy}</option>
                      <option value="publico">publico</option>`}                  
                </select> `
                : ``}	               

                <i id="btn-likes-${doc.id}" class="fas fa-heart icons m1"  data-likes="${doc.likes}"></i>
                <label id="contenedor-like" class = "color-diferent">${doc.likes}</label>
            ${ user.uid === doc.idUser 
                ?
                   `
                <i id="btn-edit-${doc.id}" class="fas fa-edit icons m1"></i>
                <i id="btn-save-${doc.id}" class="fas fa-save icons m1"></i>							
              </div>`
            : ``}					               
        </form>					
      </div> `;
      listPost += post
  });
  const publicPosts = document.getElementById("public-posts");
  publicPosts.innerHTML = listPost;
  

	// BORRAR
	[...document.getElementsByClassName('fa-window-close')].forEach(ele=>{
		ele.addEventListener('click',deleteNoteSubmit)});
		
	// EDITAR 
	[... document.getElementsByClassName('fa-edit')].forEach(ele=>{
    ele.addEventListener('click',updateNoteSubmit)});

  // LIKES  
    [... document.getElementsByClassName('fa-heart')].forEach(ele=>{
      ele.addEventListener('click',updateLikeSubmit)});
  
}

export const templatePostPublic = (data) =>{  
  let listPost = "";  
    //const newData = data.filter(doc=>doc.privacy === 'publico')
    data.forEach((doc)=>{       
      const post = `
      <div class="form-post m1" id="${doc.id}">
          <div class="user-post">
            <p>${doc.name}</p>                       
          </div>
          <form class="p2">							
            <textarea id="post-${doc.id}"readonly>${doc.textPost}</textarea>
            <h3 class ="color-text">Fecha de Publicación :${doc.date}</h3>                     
          </form>					
        </div> `;
      listPost += post
    });
    const publicPosts = document.getElementById("public-posts");
    publicPosts.innerHTML = listPost;
  
}

