import {signOutSubmit } from '../view-controller.js';
export default () => {
  //Carga de Headerhome
  const header = document.createElement('header');
  const headerContent= `
		<div class="container-header">
			<div class="logo-design align-center float-left">
				<label for="toggle"><i class="fas fa-bars"></i></label> 
				<img src="img/logomin.png"  alt="logo" />  
			</div>	 
			<input type="checkbox" class = "display-none" id="toggle">  	         
			<nav class="navbar"> 
				<ul class="main-nav">
					<li><a href="#/home"> Inicio </a></li>
					<li><a href="#/profile"> Mi Perfil</a></li>
					<li><a href="#/signIn" id="btn-signOut"> Cerrar Sesión </a></li> 
				</ul>
			</nav>                      
		</div>  `;
	header.innerHTML = headerContent;

	const btnSignOut = header.querySelector('#btn-signOut')
	btnSignOut.addEventListener('click',signOutSubmit) 



	
	
	return header;
}