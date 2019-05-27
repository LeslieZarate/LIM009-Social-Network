import { deleteCommentSubmit, updateCommentSubmit } from "../view-controller/posts-actions-model.js";
import { currentUser } from "../controller/auth.js";

export const itemComment = (objComment)=>{
    
    const divElement = document.createElement('div');
    //divElement.classList.add('form-post','m1')
    divElement.innerHTML = `
    <div>
        <p>${objComment.emailUser}</p>
        <p id="comment-${objComment.id}">${objComment.comment}</p>
        <input id="edit-${objComment.id}" value="${objComment.comment}" class="display-none"/>
        ${currentUser().uid === objComment.idUser 
            ? `<i id="btn-delete-${objComment.id}" class="fas fa-window-close icons"></i>
                <i id="btn-edit-${objComment.id}" class="fas fa-edit icons m1"></i>
                <i id="btn-save-${objComment.id}" class="fas fa-save icons m1"></i>` : ``}
         
        
    </div>    
    `;

    if(currentUser().uid === objComment.idUser && currentUser()!==null){
        //ELIMINAR COMENTARIO
        divElement.querySelector(`#btn-delete-${objComment.id}`).addEventListener('click',()=>deleteCommentSubmit(objComment));

        //EDITAR COMENTARIO 
        const textComment = divElement.querySelector(`#comment-${objComment.id}`);
        const inputComment = divElement.querySelector(`#edit-${objComment.id}`);

        divElement.querySelector(`#btn-edit-${objComment.id}`).addEventListener('click',()=>{
            textComment.classList.add('display-none'); inputComment.classList.remove('display-none');
        });

        divElement.querySelector(`#btn-save-${objComment.id}`).addEventListener('click',()=>{
            const newComent = inputComment.value;
            updateCommentSubmit(objComment,newComent)

            textComment.classList.remove('display-none'); inputComment.classList.add('display-none');
        });
        
    }
       
    return divElement;     
}