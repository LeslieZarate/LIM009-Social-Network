import {addNotes} from "../view-controller.js"
export default () => {
    const post = document.createElement('section');  
    post.classList.add('posts-content','m1', 'p2');
    const postContent = `
    	<!-- FORMULARIO POST -->
				<article class="form-post  p2 m1">
					<form>
						<textarea id="text-post"  placeholder="¿Qué estas pensando?"></textarea> 
						<div class="btn-actions">
							<select id="options-privacy">
                <option value="public">Publico</option>
                <option value="only-me">Privado</option>
				</select>
				<i id="btn-img" class="fas fa-image icons m1"></i>
				<i id="btn-post" class="fas fa-paper-plane icons m1"></i>
				<button id= "savePost">Guardar</button>
						</div>               
					</form>					
				</article>
				<!-- POSTS -->
				<h1>Publicaciones </h1>
				<!-- TOTAL POST -->
				<div class="public-posts">					
					<article class="form-post m1 ">
						<div class="user-post">
							<p>Nombre user</p>
							<i id= "btn-delete" class="fas fa-window-close icons"></i>
						</div>
						<form class="p2">							
							<textarea id="text-post-1"  placeholder="¿Qué estas pensando?" value="https"></textarea> 
							<div class="btn-actions m1">	
								<i id="btn-like" class="fas fa-heart icons m1">2</i>
								<i id="btn-edit" class="fas fa-edit icons m1"></i>	
								<i id="btn-save" class="fas fa-save icons m1"></i>							
							</div>               
						</form>					
					</article>				
				</div>
    
            `;
            
            
		post.innerHTML = postContent;  
		
		const btnSave = post.querySelector('#savePost');
		btnSave.addEventListener('click',addNotes)

		return post;
		
		
  }