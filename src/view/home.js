import {addNoteSubmit , deleteNoteSubmit, updateNoteSubmit ,updateLikeSubmit} from "../view-controller.js"
import {getPost} from "../controller/controller-firebase.js"


export default () => {
  let postImage;
  const main = document.createElement('main');
  const mainContent = `
  
  <div class="container-home p1 ">
  <!-- SECCION PERFIL -->
  <section class="profile-content m1 p2">
        <div class="perfil-user m1 p2">
          <img alt ='photo-perfil' src="img/users.png" class="m1">
        <h2>NAME</h2>
        </div>				
  </section>	 
  
  <!-- SECCION POST -->
    <section class="posts-content m1 p2">
    <!-- FORMULARIO POST -->
      <div class="form-post  p2 m1">
        <form>
          <textarea id="text-post"  placeholder="¿Qué estas pensando?"></textarea> 
          <div class="btn-actions">
            <select id="options-privacy">
              <option value="Publico">Publico</option>
              <option value="Privado">Privado</option>
            </select>
            <i id="btn-img" class="fas fa-image icons m1" src="../assets/image.png" alt="subir-imagen" title="subir imagen" /></i>
            <i id="btn-save" class="fas fa-paper-plane icons m1"></i>
          </div> 
          <input id="input-file" class="none" type="file" accept="image/*" />              
        </form>					
      </div>
      <!-- POSTS -->
      <h1>Publicaciones </h1>
      <!-- TOTAL POST -->
      <div class="public-posts" id="public-posts">			
      </div>
    <section>
 `;
      
  main.innerHTML = mainContent;  
  const btnSave = main.querySelector('#btn-save');
  btnSave.addEventListener('click',addNoteSubmit) 
  postImage = main.querySelector('#input-file');
	const uploadImageBtn = main.querySelector('#btn-img');
	uploadImageBtn.addEventListener('click', () => {
	postImage.classList.remove('none');
}); 
  getPost(templatePost)
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
          <p>${doc.name}</p>
          ${ user.uid === doc.idUser ? `<i id="${doc.id}" class="fas fa-window-close icons"></i>`: `` }					
        </div>
        <form class="p2">							
          <textarea id="post-${doc.id}"readonly>${doc.textPost}</textarea>
          <p>${doc.date}</>
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

                <i id="btn-likes-${doc.id}" class="fas fa-heart icons m1" data-likes="${doc.likes}"></i>
                <label id="contenedor-like">${doc.likes}</label>

                <i id="btn-edit-${doc.id}" class="fas fa-edit icons m1"></i>
                <i id="btn-save-${doc.id}" class="fas fa-save icons m1"></i>							
              </div>`
            : ``}					               
        </form>					
      </div> `;
      listPost += post
	});

  }else{
    const newData = data.filter(doc=>doc.privacy === 'Publico')
    newData.forEach((doc)=>{       
      const post = `
      <div class="form-post m1" id="${doc.id}">
          <div class="user-post">
            <p>${doc.name}</p>  	                     
          </div>
          <form class="p2">					
            <textarea id="post-${doc.id}"readonly>${doc.textPost}</textarea>
            <p>${doc.date}</>   
            <i id="btn-likes-${doc.id}" class="fas fa-heart icons m1" data-likes="${doc.likes}"></i>
          <label id="contenedor-like">${doc.likes}</label>                   
          </form>					
        </div> `;
      listPost += post
    });
  }
	

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

