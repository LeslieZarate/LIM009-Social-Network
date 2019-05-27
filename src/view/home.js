import {header} from "./header.js"
import {itemPost} from "./posts.js"
import {itemPostPublic } from "./postsPublic.js";

import{addPostSubmit, getImage} from "../view-controller/posts-model.js"
import {getAllPosts, getPublicPosts } from "../controller/post.js";

export const userSection = (user) => {    
  const divUser = document.createElement('div');
  divUser.innerHTML= `   
  ${user != null 
    ?`<div class="perfil-user m1 p2">
        <img alt ='photo-perfil' src="${user.photo}" class="m1">
        <h1 class ="color-title">${user.name}</h1>
      </div>` 
    
    :`hola` }
    				
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
  <div class="container-home p1 ">
    <section class="profile-content m1 p2" id="profile-content">
    <!-- AQUI VA USER SECTION -->
    </section>

    <section class="posts-content m1 p2">
    ${user != null 
      ?`
      <div class="form-post  p2 m1">
      <form id="form-post">
        <textarea id="text-post"  placeholder="¿Qué estas pensando?"></textarea> 
        <div class="btn-actions">
          <select id="options-privacy" class = "options-privacy" >
            <option value="publico">publico</option>
            <option value="privado">privado</option>
          </select>
          <label>
          <input type="file" name="fichero"  id="image-file" class="display-none">
          <i id="image-file" class="fas fa-image icons m1" alt="descargar"></i>
          </label>
          <i id="btn-save" class="fas fa-paper-plane icons m1"></i>
        </div>               
      </form>					
    </div>
      ` 
      : ``}
     
      
      <!-- POSTS -->
      <h1 class ="color-text">Publicaciones </h1>
    
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

  //Agregando Imagen
  const imageFile = home.querySelector('#image-file')
  imageFile.addEventListener('change', (event) => {
  const file = event.target.files;
  getImage(file)
  })

// Agregando Notas
if(user != null){
  
  const btnSave = home.querySelector('#btn-save');
  btnSave.addEventListener('click',()=>{     
    const privacy = home.querySelector('#options-privacy').value;  
    const textPost = home.querySelector('#text-post').value;
    const imageFile = home.querySelector('#image-file')
    if(textPost === ''){
      alert('Ingresar texto')
    }else{
      const file = imageFile.files.length
      addPostSubmit(textPost,privacy,file)
      home.querySelector('#form-post').reset()
    }
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
    notes.forEach(note => {
       listPosts.appendChild(itemPostPublic(note))
    });
  })
}

 
  return home;
}