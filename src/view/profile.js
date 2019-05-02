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
          <div class="timeline-component-content1">Front End Developer Master</div>      
            <div class="thumb-up-container">
                <i class="fa fa-user-edit"></i>Ok</div>
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