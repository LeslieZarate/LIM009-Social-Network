import { deletePostSubmit,updateTextPostSubmit,updatePrivacyPostSubmit} from "../view-controller/posts-model.js"
import{addLikePostSubmit,deleteLikePostSubmit,addCommentSubmit} from "../view-controller/posts-actions-model.js"

import {getAllPostLikes} from "../controller/posts-actions.js"
import {currentUser} from "../controller/auth.js"

import{getAllPostComments} from "../controller/posts-actions.js"
import { itemComment } from "./comments.js";

import { systemDate } from "../view-controller/posts-model.js"

export const itemPost = (objPost) =>{
  const date = new Date(((objPost.date).seconds )*1000);
  const divElement = document.createElement('div');
  divElement.classList.add('form-post','mp2')
  divElement.innerHTML = `  
    <div class="user-post">
      <p class ="color-text  mp">${objPost.email}</p>
      ${currentUser().uid === objPost.idUser ? `
      <button id="btn-delete-${objPost.id}" class="btn-circle-comment"><i class="fas fa-times icons-action"></i></button>`:``}     			
    </div>
    <div class="p2">
      <p id="post-${objPost.id}" class="text-justify">${objPost.textPost}</p>
      <textarea id="text-${objPost.id}" class="display-none" >${objPost.textPost}</textarea>

      ${objPost.imgPost === 0 ? ``: `
      
        <div class = "post-image">
          <img src='${objPost.imgPost}'> 
        </div>
      `}

      <p class ="color-text text-right" >Fecha de Publicación: ${systemDate(date)}</p>


      <hr class ="separating-line"/>

      <div class="btn-actions mp">
        <div class="action-sub1">
          <button id="btn-like-${objPost.id}" class="btn-circle display-none"><i class="fas fa-heart icons-action "></i></button> 
          <button id="btn-dislike-${objPost.id}" class="btn-circle"><i class="far fa-heart icons-action"></i></button> 
          <label id="count-likes" class = "color-text-like"></label>
        </div>
              
        <div class="action-sub2">
          ${currentUser().uid === objPost.idUser 
            ? `
            <select id="options-privacy-${objPost.id}" class ="options-privacy ">

              ${objPost.privacy === 'publico' 
              ?
                `<option value="publico">${objPost.privacy}</option>
                  <option value="privado">privado</option>`
                : `<option value="privado">${objPost.privacy}</option>
                  <option value="publico">publico</option>`}  
                  
            </select>
            <button id="btn-edit-${objPost.id}" class="btn-circle mb4"><i class="fas fa-edit icons-action"></i></button>                       
            <button id="btn-save-${objPost.id}" class="btn-circle display-none mb4"><i class="fas fa-save icons-action"></i></button>`:``}         
        </div> 
      </div>


      <hr class ="separating-line"/>
      <div>
        <form id="form-comment" class="form-comment">
          <div class="comment-sub1 mp">
            <input id="comment-${objPost.id}" class="mp"placeholder ="Escribe un comentario" type=text/>
          </div>
          <div class="comment-sub2 mp2">          
            <button id="btn-comment-${objPost.id}" class="btn-circle "><i class="fas fa-paper-plane icons-action"></i></button>
          </div>
        </form>
        <div id="all-comments-${objPost.id}">        
        </div>
      </div>      
    </div> 
  `;     
  
  // -------  Acciones------//
  if(currentUser().uid === objPost.idUser && currentUser()!==null){
    // ELIMINAR POSTS 
    divElement.querySelector(`#btn-delete-${objPost.id}`).addEventListener('click',()=>deletePostSubmit(objPost))
  
    // EDITAR PRIVACIDAD 
    const state = divElement.querySelector(`#options-privacy-${objPost.id}`)
    state.addEventListener('change',()=>{
      const newPrivacy = state.value;    
      updatePrivacyPostSubmit(objPost,newPrivacy)
    });
  
    // EDITAR POST
    const textareaPost = divElement.querySelector(`#text-${objPost.id}`)  
    const post = divElement.querySelector(`#post-${objPost.id}`);

    const btnEdit = divElement.querySelector(`#btn-edit-${objPost.id}`);
    const btnSave = divElement.querySelector(`#btn-save-${objPost.id}`);

    btnEdit.addEventListener('click',(e)=>{
        e.preventDefault()        
        textareaPost.classList.remove('display-none');   post.classList.add('display-none');
        btnEdit.classList.add('display-none'); btnSave.classList.remove('display-none'); 
    });
  
    btnSave.addEventListener('click',(e)=>{
        e.preventDefault()
        const newTextPost = textareaPost.value; 
        if(newTextPost !== ""){
          updateTextPostSubmit(objPost,newTextPost);        
          textareaPost.classList.add('display-none'); post.classList.remove('display-none'); 
          btnEdit.classList.remove('display-none'); btnSave.classList.add('display-none'); 
        }       
    });
  }

  
  if(currentUser()!== null){
     // LIKES
    const btnLike = divElement.querySelector(`#btn-like-${objPost.id}`);
    const btnDislike = divElement.querySelector(`#btn-dislike-${objPost.id}`)
    getAllPostLikes (objPost.id,likes=>{
    // conteo de todos los likes 
      let allLikes = likes.length
      divElement.querySelector("#count-likes").innerHTML = allLikes

    // verificar si el usuarioActivo dio like
      const userLike = likes.find( like=>like.idUser === currentUser().uid)
      
      if(userLike === undefined){
        // no dieron like           
        btnDislike.addEventListener('click',(e)=>{
          e.preventDefault()   
          addLikePostSubmit(objPost,currentUser())
          btnDislike.classList.add('display-none');   btnLike.classList.remove('display-none');      
        })

      }else{
        // si dieron like
        btnDislike.classList.add('display-none');  btnLike.classList.remove('display-none')
        btnLike.addEventListener('click',(e)=>{  
          e.preventDefault() 
          deleteLikePostSubmit(objPost,userLike)
          btnLike.classList.add('display-none');  btnDislike.classList.remove('display-none');
        })
      }
    })

    //AGREGAR COMENTARIOS
    const btnComment = divElement.querySelector(`#btn-comment-${objPost.id}`);
    

    btnComment.addEventListener('click',(e)=>{
      e.preventDefault()
      const newComent = divElement.querySelector(`#comment-${objPost.id}`);
      if(newComent.value !==""){
        addCommentSubmit(objPost,currentUser(),newComent.value);
        newComent.value=""       
      }    
    });    
  }

  // agregando comentarios
  const allComents = divElement.querySelector(`#all-comments-${objPost.id}`);

  getAllPostComments(objPost.id,coments=>{
    allComents.innerHTML="";
    coments.forEach(comment => {
      allComents.appendChild(itemComment(comment))
    });
  });

  return divElement; 
}
