import {signOutSubmit } from '../view-controller/auth-model.js';
export const header = (user) =>{
	const header = document.createElement('div');
	header.innerHTML= `		
		  <div class="container-header">
			  <div class="logo-design align-center float-left">
				  <label for="toggle"><i class="fas fa-bars"></i></label> 
				  <img src="img/logo.png"  alt="logo" />  
			  </div>	 
			  <input type="checkbox" class = "display-none" id="toggle">  	         
			  <nav class="navbar"> 
		  <ul class="main-nav">
		  ${user != null 
			?`<li><a href="#/home"> Inicio </a></li>
					  <li><a href="#/profile"> Mi Perfil</a></li>					
			<li><a href="#/home" id="btn-signOut"> Cerrar Sesión </a></li>`
			
			:` <li><a href="#/signIn"> Inicia Sesion</a></li>`}
					
							   
		  </ul>
			  </nav>                      
		  </div> 
	`;
	if(user != null){
	  const btnSignOut = header.querySelector('#btn-signOut')
	  btnSignOut.addEventListener('click',signOutSubmit);
	}
	  return header;
  }


