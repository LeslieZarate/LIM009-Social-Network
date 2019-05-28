
import{getAllPostComments} from "../controller/posts-actions.js"
export const itemPostPublic = (objPost) =>{
    const divElement = document.createElement('div');
    divElement.classList.add('form-post','mp2')
    
    divElement.innerHTML = `
      <div class="user-post">
        <p class ="color-text  mp">${objPost.email}</p>            			
      </div>
      <div class="p2">
        <p id="post-${objPost.id}" class="text-justify">${objPost.textPost}</p>
        ${objPost.imgPost === 0 ? ``: `
      
        <div class = "post-image">
          <img src='${objPost.imgPost}'> 
        </div>
      `}

        <p class ="color-text text-right" >Fecha de Publicación :${objPost.date}</p>
      </div> 
      <hr class ="separating-line"/>
      <div>          
          <div id="comments-${objPost.id}" class="m1">        
          </div>
      </div>     
    `; 
    
    const allComents = divElement.querySelector(`#comments-${objPost.id}`);
    getAllPostComments(objPost.id,coments=>{
      allComents.innerHTML="";
      coments.forEach(comment => {
        allComents.appendChild(itemComments(comment))
      });
    });
    
    return divElement; 
  }


  const itemComments = (objComment)=>{
    
    const divElement = document.createElement('div');
    //divElement.classList.add('form-post','m1')
    divElement.innerHTML = `
    <div class ="comment-post mt p2">
      <div class="user-post-comment">
        <p class="color-text font-bold">${objComment.emailUser}</p>
      </div>
      <p id="comment-${objComment.id}">${objComment.comment}</p>        
    </div>    
    `;         
    return divElement;     
}

