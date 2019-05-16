import {signOutSubmit } from '../view-controller.js';
export default (user) => {
	//console.log(user)
const header = document.createElement('header');
  const headerContent= `		
		<div class="container-header">
			<div class="logo-design align-center float-left">
				<label for="toggle"><i class="fas fa-bars"></i></label> 
				<img src="img/loogo.png" alt="logo" class="img-logo"/> 
			</div>	 
			<input type="checkbox" class = "display-none" id="toggle">  	         
			<nav class="navbar"> 
				<ul class="main-nav">
				${user !== undefined
					?`<li><a href="#/home"> Inicio </a></li>
						<li><a href="#/profile"> Mi Perfil</a></li>					
						<li><a href="#/home" id="btn-signOut"> Cerrar Sesión </a></li>`
				:`<li><a href="#/signIn"> Inicia Sesion</a></li>`}			
										
				</ul>
			</nav>                      
		</div> 
		
		`;
	header.innerHTML = headerContent;
	if(user !== undefined){
		const btnSignOut = header.querySelector('#btn-signOut')
		btnSignOut.addEventListener('click',signOutSubmit);
	}
	return header;
}