import {signInOnSubmit , signInGoogleOnSubmit ,signInFacebookOnSubmit } from "../view-controller/auth-model.js"

export default () => {
    const form = document.createElement('div');
    const formContent =`
				<div class="container p1">
				<section class="img-content center-content m1-rlt p2 ">
					<img src="img/intro.png">
				</section>
				<section class="forms-content  m1 p2 ">
				<article class="register-login p4">
					<img alt ='logo' src="img/logo.png" class="img-logo">
					<h2> Inicia Sesión </h2>				
					<form>
						<div class="form-group">
							<input class="form-control" id="email" type="email" placeholder="Ingresa tu email" />
						</div>
						<div class="form-group">							
							<input class="form-control" id="password" type="password" placeholder="Ingresa tu contraseña"/>
						</div>
						<div class="form-group">
							<button id="btn-login" type="submit">Login</button>
						</div>                  
					</form>
					<p>O bien ingresa con:</p>
					<div class="login-social center-content m1">
							<a id="btn-facebook" class="login-social-item">
								<img src="https://i.ibb.co/NmxyWjL/ico-fb.png" alt="facebook">
							</a>
							<a  id="btn-google" class="login-social-item">
								<img src="https://i.ibb.co/xgLXQrr/ico-gg.png" alt="Google">
							</a>							
					</div>
					<p>Aún no tienes cuenta <span><a href="#/account" id="sing-up">Regístrate</a></span></p>				
				</article>			
			</section>
				
			</div>
    `;
	
	form.innerHTML = formContent;

	// selecccionando elementos del DOM

	// Logeo con EMAIL Y PASSWORD 
	const btnLogin = form.querySelector("#btn-login");
	btnLogin.addEventListener('click',signInOnSubmit );

	// LOGEO CON GOOGLE
	const btnGoogle = form.querySelector('#btn-google'); 
	btnGoogle.addEventListener('click',signInGoogleOnSubmit );

	// LOGEO CON FACEBOK
	const btnFacebook = form.querySelector('#btn-facebook'); 
	btnFacebook.addEventListener('click',signInFacebookOnSubmit );

	

return form;
}