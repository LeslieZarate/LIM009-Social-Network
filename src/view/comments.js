import { deleteCommentSubmit, updateCommentSubmit } from "../view-controller/posts-actions-model.js";
import { currentUser } from "../controller/auth.js";

export const itemComment = (objComment)=>{
    
    const divElement = document.createElement('div');
    //divElement.classList.add('form-post','m1')
    divElement.innerHTML = `
    <div class ="comment-post mt p2">
        <div class="user-post-comment">
        <p class="color-text font-bold">${objComment.emailUser}</p>
        ${currentUser().uid === objComment.idUser 
            ? ` <button id="btn-delete-${objComment.id}" class="btn-circle-comment"><i class="fas fa-times icons-comment"></i></button>`: ``}
         
        </div>
        
        <p id="comment-${objComment.id}">${objComment.comment}</p>
        <input id="edit-${objComment.id}" value="${objComment.comment}" class=" mp2 display-none"/>
        ${currentUser().uid === objComment.idUser 
            ? `
            <button id="btn-edit-${objComment.id}" class="btn-circle-comment mp2"><i class="fas fa-edit icons-comment"></i></button>
            <button id="btn-save-${objComment.id}" class="btn-circle-comment mp2 display-none"><i class="fas fa-save icons-comment"></i></button>

           ` : ``}
         
    </div>    
    `;

    if(currentUser().uid === objComment.idUser && currentUser()!==null){
        //ELIMINAR COMENTARIO
        divElement.querySelector(`#btn-delete-${objComment.id}`).addEventListener('click',()=>deleteCommentSubmit(objComment));

        //EDITAR COMENTARIO 
        const textComment = divElement.querySelector(`#comment-${objComment.id}`);
        const inputComment = divElement.querySelector(`#edit-${objComment.id}`);

        const btnEdit = divElement.querySelector(`#btn-edit-${objComment.id}`);
        const btnSave = divElement.querySelector(`#btn-save-${objComment.id}`);

        btnEdit.addEventListener('click',(e)=>{
            e.preventDefault()
            textComment.classList.add('display-none'); inputComment.classList.remove('display-none');
            btnEdit.classList.add('display-none'); btnSave.classList.remove('display-none');
        });

        btnSave.addEventListener('click',(e)=>{
            e.preventDefault()
            const newComent = inputComment.value;
            if(newComent !== ""){
                updateCommentSubmit(objComment,newComent);
                textComment.classList.remove('display-none'); inputComment.classList.add('display-none');
                btnEdit.classList.remove('display-none'); btnSave.classList.add('display-none');
            }
           
        });
        
    }
       
    return divElement;     
}