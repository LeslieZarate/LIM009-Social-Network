import {signOutSubmit } from '../view-controller.js';
export default (user) => {  

const header = document.createElement('header');
  //console.log(firebase.auth().currentUser)
  const headerContent= `
		
		<div class="container-header">
			<div class="logo-design align-center float-left">
				<label for="toggle"><i class="fas fa-bars"></i></label> 
				<img src="img/logomin.png"  alt="logo" />  
			</div>	 
			<input type="checkbox" class = "display-none" id="toggle">  	         
			<nav class="navbar"> 
				<ul class="main-nav">
				${user === null ? `<li><a href="#/signIn"> Inicia Sesion</a></li>`: `	<li><a href="#/dramafever"> Inicio </a></li>
				<li><a href="#/profile"> Mi Perfil</a></li>					
				<li><a href="#/signIn" id="btn-signOut"> Cerrar Sesión </a></li>`}
											
						
				</ul>
			</nav>                      
		</div> 
		
		`;
	header.innerHTML = headerContent;

	if(user!= null){
		const btnSignOut = header.querySelector('#btn-signOut')
	btnSignOut.addEventListener('click',signOutSubmit);
	}
	
	

	return header;
}