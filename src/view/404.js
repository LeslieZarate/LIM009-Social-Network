export default () => {

  const divElemt = document.createElement('div');
  const viewDifferent = `
          <div>          
            <h2>404</h2>
            <h1>Página no encontrada</h1>
            <p>El archivo especificado no se encontró en este sitio web. Por favor, compruebe la URL para errores y vuelva a intentarlo.</p>
          </div>
          `;
           
    divElemt.setAttribute('id', 'message');
    divElemt.innerHTML = viewDifferent;

    return divElemt;
};