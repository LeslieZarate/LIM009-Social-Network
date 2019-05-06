import {addNoteSubmit} from "../view-controller.js"
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
							<button id="btn-save" type="submit">Publicar</button>
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
							<textarea id="text-post"  placeholder="¿Qué estas pensando?" value="https"></textarea> 
							<div class="btn-actions m1">
								<select id="options-privacy" class="m1">
	                <option value="public">Publico</option>
	                <option value="only-me">Privado</option>
	            	</select>
								<button id="btn-save" type="submit"><i class="fas fa-paper-plane icons m1"></i>Publicar</button>				
								<i class="fas fa-thumbs-up icons m1">0</i>								
							</div>               
						</form>					
					</article>				
				</div>
    
            `;
            
            
		post.innerHTML = postContent;  
		
		const btnSave = post.querySelector('#btn-save');
		btnSave.addEventListener('click',addNoteSubmit)

		return post;
		
		
  }