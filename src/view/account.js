import {signUpSubmit} from '../view_controller'

export default ()=>{
    const form = document.createElement('div');
    const formContent = `
    <div class="container">
		<section class="img-page p1 m1 h7">
			<div class="intro">
				<img src="img/intro.png">
			</div>		
		</section>
		<section class="main m1 h7 p1">
			<article>
				<div class="register-login p2">
					<div class="center-content">
						<img alt ='logo' src="img/logo1.png" class="img-logo">
					</div>				
					<h2> Regístrate </h2>				
					<form id="form" class="form-login">
						<div class="form-group">
							<label  for="name">Nombre</label>
							<input class="form-control" id="name" type="text" placeholder="Ingresa tu nombre"/>
						</div>
						<div class="form-group">
							<label  for="email">Email</label>
							<input class="form-control" id="email" type="email" placeholder="Ingresa tu email"/>
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input class="form-control" id="password" type="password" placeholder="Ingresa tu contraseña"/>
						</div>
						<div class="form-group">
								<button id="btn-singUp" type="submit">Registrar</button>
						</div>                  
					</form>					
				</div>
			</article>
		</section>
	</div>

    `;

    const btnSingUp = document.querySelector('#btn-singUp');
    btnSingUp.addEventListener('click',signUpSubmit)
return form;
}

