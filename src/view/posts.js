import {addNoteSubmit , deleteNoteSubmit} from "../view-controller.js"
import {getPost} from "../controller/controller-firebase.js"
export default () => {
  const post = document.createElement('section');  
	post.classList.add('posts-content','m1', 'p2');
	const postContent = `
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
    `;
           
		post.innerHTML = postContent;		
		const btnSave = post.querySelector('#btn-save');
		btnSave.addEventListener('click',addNoteSubmit)
		getPost(templatePost)
		return post;
			
}
export const templatePost = (data) =>{
	let listPost = "";
	data.forEach((doc)=>{
		const post = `
		<div class="form-post m1" id="${doc.id}">
				<div class="user-post">
					<p>${doc.name}</p>
					<i id="${doc.id}" class="fas fa-window-close icons"></i>
		    </div>
				<form class="p2">							
					<textarea readonly >${doc.textPost}</textarea>
					<p>${doc.date}</>
					<div class="btn-actions m1">	
						<i id="btn-like" class="fas fa-heart icons m1">${doc.likes}</i>
						<i id="btn-edit" class="fas fa-edit icons m1"></i>	
						<i id="btn-save" class="fas fa-save icons m1"></i>							
						</div>               
				</form>					
			</div> `;
		listPost += post
	});

	const publicPosts = document.getElementById("public-posts");
	publicPosts.innerHTML = listPost;

	// publicPosts.addEventListener('click', deleteNoteSubmit);

	[...document.getElementsByClassName('fa-window-close')].forEach((e)=>{
		 console.log(e);
		 e.addEventListener('click',deleteNoteSubmit)});
	//	console.log([...document.getElementsByClassName('fa-window-close')]);


}