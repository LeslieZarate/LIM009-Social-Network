import {addNoteSubmit , deleteNoteSubmit, updateNoteSubmit ,updateLikeSubmit} from "../view-controller.js"
import {getAllPosts,getPublicPosts} from "../controller/controller-firebase.js"

export default (user) => {
  let postImage;
  const main = document.createElement('main');
  const mainContent = `
  
  
  <div class="container-home p1 ">
    <!-- SECCION PERFIL -->
    ${user!== undefined
      ?`<section class="profile-content m1 p2">
          <div class="perfil-user m1 p2">
            <img alt ='photo-perfil' src="${user.photo}" class="m1">
          <h5>${user.name}</h5>
          </div>				
      </section>`
      :`<section class="profile-content m1 p2">
        <div class="perfil-user m1 p2">
          <img alt ='photo-perfil' src="img/logo1.png" class="m1">
        <h3>NAME</h3>
        </div>				
        </section>`}
    	

    <!-- SECCION POST -->
    <section class="posts-content m1 p2">
    <!-- FORMULARIO POST -->
    ${user !== undefined ?`<div class="form-post  p2 m1">
    <form id="form-post">
      <textarea id="text-post"  placeholder="¿Qué estas pensando?"></textarea> 
      <div class="btn-actions">
        <select id="options-privacy">
          <option value="Publico">Publico</option>
          <option value="Privado">Privado</option>
        </select>
        <i id="btn-img" class="fas fa-image icons m1"></i>
        <i id="btn-save" class="fas fa-paper-plane icons m1"></i>
      </div>               
    </form>					
  </div>` : ``}
      
      <!-- POSTS -->
      <h2>Publicaciones </h2>
      <!-- TOTAL POST -->
      <div class="public-posts" id="public-posts">			
      </div>
    <section>
  </div>  
 `;
      
  main.innerHTML = mainContent;  
  postImage = main.querySelector('#input-file');
	const uploadImageBtn = main.querySelector('#btn-img');
	uploadImageBtn.addEventListener('click', () => {
	postImage.classList.remove('none');
}); 
  if(user !== undefined){
    const btnSave = main.querySelector('#btn-save');
     btnSave.addEventListener('click',addNoteSubmit)
     getAllPosts(templatePost)
  }else{
    getPublicPosts(templatePost)
  }
  
   
 

  return main  
}


export const templatePost = (data) =>{
  //const newData = data.filter(doc=>doc.privacy === 'public')
  const user = firebase.auth().currentUser
  let listPost = "";
  if(user !== null){
    data.forEach((doc)=>{       
      const post = `
      <div class="form-post m1" id="${doc.id}">
        <div class="user-post">
        <img alt ='photo-perfil' src="${doc.photo}" class="icon-photo">
          <h3>${doc.name}</h3>
          ${ user.uid === doc.idUser ? `<i id="${doc.id}" class="fas fa-window-close icons"></i>`: `` }					
        </div>
        <form class="p2">							
          <textarea id="post-${doc.id}"readonly>${doc.textPost}</textarea>
          <h3>Fecha de Publicación :${doc.date}</h3>
          <p id="message-${doc.id}" class="display-none">Ahora puedes editar </p>
          ${ user.uid === doc.idUser 
            ?
             `<div class="btn-actions m1">
                <select id="options-${doc.id}">
                  
                  ${doc.privacy === 'Publico' 
                  ? `<option value="Publico">${doc.privacy}</option>
                     <option value="Privado">Privado</option>`

                  :  `<option value="Privado">${doc.privacy}</option>
                      <option value="Publico">Publico</option>`}                  
                </select>                

                <i id="btn-edit-${doc.id}" class="fas fa-edit icons m1"></i>
                <i id="btn-save-${doc.id}" class="fas fa-save icons m1"></i>							
              </div>`
            : ``}

            <i id="btn-likes-${doc.id}" class="fas fa-heart icons m1"  data-likes="${doc.likes}"></i>
            <label id="contenedor-like">${doc.likes}</label>					               
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
  
  else{
    //const newData = data.filter(doc=>doc.privacy === 'Publico')
    data.forEach((doc)=>{       
      const post = `
      <div class="form-post m1" id="${doc.id}">
          <div class="user-post">
            <p>${doc.name}</p>                       
          </div>
          <form class="p2">							
            <textarea id="post-${doc.id}"readonly>${doc.textPost}</textarea>
            <p>Fecha de Publicación :${doc.date}</p>                     
          </form>					
        </div> `;
      listPost += post
    });
    const publicPosts = document.getElementById("public-posts");
    publicPosts.innerHTML = listPost;
  }
}

