// aqui exportaras las funciones que necesites

export default () => {
  const form = document.createElement('div');
  const formContent = `
          <div>
          <header>
          <img src="img/logo1.png" class="title">
              <nav class="header-nav">
                <ul>
                  <li> <i class="fa fa-home"></i></li>
                  <li> <i class="fa fa-users"></i></li>
                  <li> <i class="fa fa-user-edit"></i> </li>
                  <li> <i class="fa fa-cog"></i></li>
                  <li> <i class="fa fa-sign-in-alt"></i></li>
                </ul> 
              </nav>
            </header>
            <div class="page-content">
            <div class="timeline">
              <div class="timeline-component">
                <div class="timeline-component-header">
                  <div class="timeline-component-header-img1">
                </div>
              </div>
                <div class="timeline-component-interact">
                  <div class="thumb-up-container">
                <div class="timeline-component-content1">
                LESLI ZARATE
                </div>
              <div class="timeline-component-content1">
                Front End Developer Master
                </div>      
                  <div class="thumb-up-container">
                    <i class="fa fa-user-edit"></i>Ok</div>
                </div>    
              </div>
            </div>
            </div>
          </div>
            <div class="page-content">
            <div class="timeline">
              <div class="timeline-component">
                <div class="timeline-component-header">
                  <div class="timeline-component-header-img">
                </div>
                  <div class="timeline-component-header-name">
                    Leslie
                  </div>
                  <div class="timeline-component-header-more">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
                <div class="timeline-component-content">
                Por si aún no sabes qué es un dorama, ¡no te preocupes! Son series de televisión asiáticas que se emiten desde los sesenta y que en estos últimos años se han popularizado, enamorando a todo Internet con sus increíbles y originales historias, las cuales a veces quisiéramos que fueran reales. Si aún no has visto alguna, o si ya eres toda una doramática, te presentamos 25 opciones para que disfrutes de un fin de semana muy oriental. No olvides tener pañuelos a la mano porque el drama es su especialidad.
                </div>
                <div class="timeline-component-interact">
                  <div class="thumb-up-container">
                    <i class="fas fa-thumbs-up"></i>2</div>
                  <input type="text" placeholder="Comment..." id="comment-container">
                      <div class="msgSend"><i class="fas fa-paper-plane"></i>
                </div>
                </div>
              </div>
                    <div class="timeline-component">
                <div class="timeline-component-header">
                  <div class="timeline-component-header-img">
                </div>
                  <div class="timeline-component-header-name">
                    Diana
                  </div>
                    <div class="timeline-component-header-more">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
                <div class="timeline-component-content">
                Do Min Joon es un extraterrestre con forma humana que llegó a la tierra hace 400 años durante la dinastía Chosun. Mientras vivía alrededor de especies humanas inferiores, Min Do siempre ha sido indiferente con sus vecinos humanos. Pero en la Corea de hoy en día, Min Do conoce a la gran actriz Cheon Song Yi y se enamora de ella. ¿Podrá una pareja de especies diferentes tener un futuro juntos?. Por eso tienes que ver el Dorama "Mi amor de las Estrellas".
                </div>
                <div class="timeline-component-interact">
                  <div class="thumb-up-container">
                    <i class="fas fa-thumbs-up"></i>10</div>
                  <input type="text" placeholder="Comment..." id="comment-container">
                    <div class="msgSend"><i class="fas fa-paper-plane"></i>
                </div>
                </div>
              </div>
              </div>
              </div>
            </div>
            `;

  form.innerHTML = formContent
  return form 
}