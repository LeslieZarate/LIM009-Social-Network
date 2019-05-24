import { deletePostSubmit,updateTextPostSubmit,updatePrivacyPostSubmit} from "../view-controller/posts-model.js"
import{addLikePostSubmit} from "../view-controller/posts-actions-model.js"

import {currentUser} from "../controller/user.js"

export const itemPost = (objPost) =>{
  const divElement = document.createElement('div');
  divElement.classList.add('form-post','m1')
  divElement.innerHTML = `
    <div class="user-post">
      <p class ="color-text">${objPost.email}</p>
      ${currentUser().uid === objPost.idUser ? ` <i id="btn-delete-${objPost.id}" class="fas fa-window-close icons"></i>`:``}     			
    </div>
    <form class="p2">			

      <p id="post-${objPost.id}">${objPost.textPost}</p>
      <textarea id="text-${objPost.id}" class="display-none" >${objPost.textPost}</textarea>

      <h3 class ="color-text" >Fecha de Publicación :${objPost.date}</h3>
      <div class="btn-actions m1">
        ${currentUser().uid === objPost.idUser 
          ? `
          <select id="options-privacy-${objPost.id}" class ="options-privacy">
            ${objPost.privacy === 'publico' 
            ?
              `<option value="publico">${objPost.privacy}</option>
                <option value="privado">privado</option>`

              :  `<option value="privado">${objPost.privacy}</option>
                  <option value="publico">publico</option>`}                  
          </select> 
          `
        : ``}         

        <i id="btn-like-${objPost.id}" class="fas fa-heart icons m1"  data-likes="${objPost.likes}"></i>                               
        <label id="contenedor-like" class = "color-diferent">${objPost.likes}</label>

        ${currentUser().uid === objPost.idUser 
          ? ` <i id="btn-edit-${objPost.id}" class="fas fa-edit icons m1"></i>
              <i id="btn-save-${objPost.id}" class="fas fa-save icons m1"></i> ` : ``}
      </div>          
    </form> 
  `;     
  
  if(currentUser().uid === objPost.idUser && (currentUser()) !==null){

    // ELIMINAR POSTS 
    divElement.querySelector(`#btn-delete-${objPost.id}`).addEventListener('click',()=>deletePostSubmit(objPost))
  
    // EDITAR PRIVACIDAD 
    const state = divElement.querySelector(`#options-privacy-${objPost.id}`)
    state.addEventListener('change',()=>{
      const newPrivacy = state.value;    
      updatePrivacyPostSubmit(objPost,newPrivacy)
    });
  
    // EDITAR POST 
    divElement.querySelector(`#btn-edit-${objPost.id}`)
    .addEventListener('click',()=>{
        const textareaPost = divElement.querySelector(`#text-${objPost.id}`)      
        textareaPost.classList.remove('display-none')
  
        const post = divElement.querySelector(`#post-${objPost.id}`)
        post.classList.add('display-none')   
    })
  
    divElement.querySelector(`#btn-save-${objPost.id}`)
    .addEventListener('click',()=>{
        const textareaPost = divElement.querySelector(`#text-${objPost.id}`) 
        const newTextPost = textareaPost.value;
  
        updateTextPostSubmit(objPost,newTextPost);
        
        textareaPost.classList.add('display-none')
        const post = divElement.querySelector(`#post-${objPost.id}`)
        post.classList.remove('display-none')   
    })
  }

   // LIKES
  if((currentUser()) !==null){ 
    divElement.querySelector(`#btn-like-${objPost.id}`).addEventListener('click',()=>{   
      addLikePostSubmit(objPost,currentUser())
    })
  }

  return divElement; 
}
