export default () => {

  const divElemt = document.createElement('div');
  const viewDifferent = `
            <div class="lineas">
            <blockquote class="tr_bq">
              <h1>- Opps! 404 Error -</h1>
              <h2> Sorry! Regresa...</h2>
              <h1>Back to <a href="#">home</a></h1></blockquote>
            </div>
          `;
           
    divElemt.setAttribute('id', 'message');
    divElemt.innerHTML = viewDifferent;

    return divElemt;
};