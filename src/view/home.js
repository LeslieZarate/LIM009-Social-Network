import {header} from "./header.js"
import {itemPost} from "./posts.js"
import { itemPostPublic } from "./postsPublic.js";

import{addPostSubmit,getImageLink} from "../view-controller/posts-model.js"
import { getAllPosts, getPublicPosts } from "../controller/post.js";

export const userSection = (user) => {    
  const divUser = document.createElement('div');
  
  divUser.innerHTML= `   
  ${user != null 
    ?`<img class="img-section" src='img/img-section.jpg'/>
      <div class="perfil-user">
        <img alt ='photo-perfil' src="${user.photo}">
        <h2>${user.name}</h2>
      </div>` 
    
    :`<img class="img-section" src='img/logotipo.png'/>`}
    				
  `;    
  return divUser
}

export const ContentHome = (user)=>{
  const home = document.createElement('div');
  const homeContent = `
  <header id="header-content">
  <!-- AQUI VA EL HEADER-->
  </header>

  <main>
  <div class="container-home p1">
    <section class="profile-content m1" id="profile-content">
    <!-- AQUI VA USER SECTION -->
    </section>

    <section class="posts-content m1 ">
    ${user != null 
      ?`
      <div class="form-post p2">
      <form id="form-post">
        <textarea id="text-post"  placeholder="¿Qué estas pensando?"></textarea> 

       

        <div class="btn-actions"> 
          <div class="action-sub1 mp">
          
          <label class="btn-label">
            <input type="file" name="fichero"  id="image-file" class="display-none">            
            <i id="image-file" class="fas fa-image icons-action btn-circle"></i>
          </label>

           <!-- <input type="file" accept="image/*" id="image-file" /> -->
            <progress value="0" max="100" class="progress-bar mb4" id="uploader">0%</progress>
          </div>


          <div class="action-sub2 mp">
            <select id="options-privacy" class = "options-privacy" >
              <option value="publico">publico</option>
              <option value="privado">privado</option>
            </select>
            
            <button  id="btn-save" class="btn-circle mb4"><i class="fas fa-paper-plane icons-action"></i></button> 
          </div>      
          
        </div>               
      </form>					
    </div>
      ` 
      : ``}
     
      
      <!-- POSTS -->
        
      <div class="public-posts" id="public-posts">
      <!-- TOTAL POST -->
      </div>
    <section>
  <div> 
  </main>
  `;
  
  home.innerHTML=homeContent 
  // Header 
  const headerHome = home.querySelector("#header-content")     
    headerHome.appendChild(header(user));
  
  //Mostrando al usuario
  const sectionUser = home.querySelector("#profile-content") 
  sectionUser.appendChild(userSection(user)); 


// Agregando Notas
if(user != null){
  
  const fileButton = home.querySelector(`#image-file`);  
  const uploader = home.querySelector(`#uploader`);  
  
  const btnSave = home.querySelector('#btn-save');
  btnSave.addEventListener('click',(e)=>{ 
    e.preventDefault() 
    const imgPost = fileButton.files.length;     // valor de la porpiedad length      
    const privacy = home.querySelector('#options-privacy').value;  
    const textPost = home.querySelector('#text-post').value;
    if(textPost === ''){
      alert('Ingresar texto')
    }else{
      addPostSubmit(textPost,privacy,imgPost)
      home.querySelector('#form-post').reset()
    }
  });

  //  CARGANDO IMAGEN
  fileButton.addEventListener('change', (e)=> {    
    const  file = e.target.files[0];  // obtener el elemento cuando se habra la carpeta 
    console.log(e.target.files)
    getImageLink(file,uploader);     
    
  });
}




// Mostrando todos los Post
const listPosts = home.querySelector('#public-posts');

if(user != null){
  getAllPosts(notes=>{
      listPosts.innerHTML ="";
      notes.forEach(note => {
        listPosts.appendChild(itemPost(note))
        });
  })  
}else{
  getPublicPosts(notes=>{
    listPosts.innerHTML ="";
    notes.forEach(note => {
       listPosts.appendChild(itemPostPublic(note))
    });
  })
}

 
  return home;
}