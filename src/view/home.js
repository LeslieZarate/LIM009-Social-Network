import {addNoteSubmit , deleteNoteSubmit, updateNoteSubmit} from "../view-controller.js"
import {getPost} from "../controller/controller-firebase.js"

export default () => {
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
              <option value="public">Publico</option>
              <option value="only-me">Privado</option>
            </select>
            <i id="btn-img" class="fas fa-image icons m1"></i>
            <i id="btn-save" class="fas fa-paper-plane icons m1"></i>
          </div>               
        </form>					
      </div>
      <!-- POSTS -->
      <h1>Publicaciones </h1>
      <!-- TOTAL POST -->
      <div class="public-posts" id="public-posts">			
      </div>
    <section>
  </div>  
 `;
      
  main.innerHTML = mainContent;  
  const btnSave = main.querySelector('#btn-save');
	btnSave.addEventListener('click',addNoteSubmit) 
  getPost(templatePost)
  return main  
}


export const templatePost = (data) =>{
	const newData = data.filter(doc=>doc.privacy === 'public')
	let listPost = "";
	newData.forEach((doc)=>{
    const post = `
		<div class="form-post m1" id="${doc.id}">
				<div class="user-post">
					<p>${doc.name}</p>
					<i id="${doc.id}" class="fas fa-window-close icons"></i>
		    </div>
				<form class="p2">							
					<textarea id="post-${doc.id}"readonly>${doc.textPost}</textarea>
					<p>${doc.date}</>
					<div class="btn-actions m1">	
						<i id="btn-likes" class="fas fa-heart icons m1">${doc.likes}</i>
						<i id="btn-edit-${doc.id}" class="fas fa-edit icons m1"></i>
						<i id="btn-save-${doc.id}" class="fas fa-save icons m1"></i>							
						</div>               
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
}

//LIKES