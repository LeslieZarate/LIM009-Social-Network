import Posts from "./posts.js"

export default () => {
  const main = document.createElement('main');
  const mainContent = `
  <div class="container-home p1 ">
  <!-- SECCION PERFIL -->
  <section class="profile-content m1 p2">
				<div class="perfil-user m1 p2">
					<img alt ='photo-perfil' src="img/logo1.png" class="m1">
				<h2>nombre user</h2>
				</div>				
  </section>	
  <!-- SECCION POST -->
  </div>
 `; 
  main.innerHTML = mainContent;

  const containerHome = main.querySelector('.container-home')
  containerHome.appendChild(Posts());
  
  return main
  ;
}
