import { deletePostSubmit,updateTextPostSubmit,updatePrivacyPostSubmit} from "../view-controller/posts-model.js"
import{addLikePostSubmit,deleteLikePostSubmit,addCommentSubmit} from "../view-controller/posts-actions-model.js"

import {getAllPostLikes} from "../controller/posts-actions.js"
import {currentUser} from "../controller/auth.js"

import{getAllPostComments} from "../controller/posts-actions.js"
import { itemComment } from "./comments.js";

export const itemPost = (objPost) =>{
  const divElement = document.createElement('div');
  divElement.classList.add('form-post','m1')
  divElement.innerHTML = `  
    <div class="user-post">
    <img alt ='Myphoto' src="${objPost.photo}" class="icon-photo">
      <p class ="color-text">${objPost.name}</p>
      ${currentUser().uid === objPost.idUser ? `
      <button id="btn-delete-${objPost.id}" class="btn-circle-comment"><i class="fas fa-times icons-action"></i></button>`:``}     			
    </div>
    <div class="p2">
    <div>
      <p id="post-${objPost.id}" class="text-justify">${objPost.textPost}</p>
      <textarea id="text-${objPost.id}" class="display-none" >${objPost.textPost}</textarea>
      <div id="photoUploaded"></div>     
    </div>
      <p class ="color-text text-right" >Fecha de Publicación :${objPost.date}</p>
      <hr class ="separating-line"/>
      <div class="btn-actions mp">
        ${currentUser().uid === objPost.idUser 
          ? `
          <select id="options-privacy-${objPost.id}" class ="options-privacy ">
            ${objPost.privacy === 'publico' 
            ?
              `<option value="publico">${objPost.privacy}</option>
                <option value="privado">privado</option>`
              : `<option value="privado">${objPost.privacy}</option>
                 <option value="publico">publico</option>`}                  
         </select>`:``}         

        <button id="btn-like-${objPost.id}" class="btn-circle display-none"><i class="fas fa-heart icons-action "></i></button> 
        <button id="btn-dislike-${objPost.id}" class="btn-circle"><i class="far fa-heart icons-action"></i></button> 
        <label id="count-likes" class = "color-text-like"></label>

        ${currentUser().uid === objPost.idUser 
          ? ` <button id="btn-edit-${objPost.id}" class="btn-circle mb"><i class="fas fa-edit icons-action"></i></button>                         
              <button id="btn-save-${objPost.id}" class="btn-circle display-none mb"><i class="fas fa-save icons-action"></i></button>
               ` : ``}
      </div> 
      <hr class ="separating-line"/>
      <div>
        <form id="form-comment" class="form-comment m1">
          <input id="comment-${objPost.id}" class="mp"placeholder ="Escribe un comentario" type=text/>
          <button id="btn-comment-${objPost.id}" class="btn-circle  m1"><i class="fas fa-paper-plane icons-action"></i></button>
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

    //Subir Imagen
    const postImg = divElement.querySelector('#photoUploaded');
    if (objPost.image !== '') {
      const image = document.createElement('img')
      image.setAttribute('src', objPost.image)
      image.classList.add('styleAddImage');
      postImg.appendChild(image)
    }
  
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
