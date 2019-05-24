export const itemPostPublic = (objPost) =>{
    const divElement = document.createElement('div');
    divElement.classList.add('form-post','m1')
    divElement.innerHTML = `
      <div class="user-post">
        <p class ="color-text">${objPost.email}</p>          			
      </div>
      <form class="p2">	  
        <p id="post-${objPost.id}">${objPost.textPost}</p>
        <textarea id="text-${objPost.id}" class="display-none" >${objPost.textPost}</textarea>  
        <h3 class ="color-text" >Fecha de Publicación :${objPost.date}</h3>                       
      </form> 
    `;  
    return divElement; 
  }


