import Login from "./view/login.js"
import Account from "./view/account.js"
import Home from "./view/home.js"
import Error from "./view/404.js"

const changeTmp = (hash) => {
    if (hash === '#/' || hash === '' || hash === '#') {
      return viewTmp('#/signIn');
    } else if (hash === '#/signIn' || hash === '#/home' || hash ==='#/account') {
      return viewTmp(hash);
    } else {
      return viewTmp();
    }
  }
  
  const viewTmp = (routers) => {
   /* const router = routers.substr(2, routers.length - 2)*/
    const root = document.getElementById('root');
    root.innerHTML = '';
    switch (routers) {
        case '#/signIn':
        root.appendChild(Login());
        break;
        case '#/account':
        root.appendChild(Account());
        break;

        case '#/home':
        root.appendChild(Home());
        break;
      /*
        case 'error':
        root.appendChild(Error());
        break;*/

       default:
        root.appendChild(Error());
        break;
    }
  }
  

 export const initRouter = () => {
    window.addEventListener('load', changeTmp(window.location.hash))
    if (("onhashchange" in window)) window.onhashchange = () => changeTmp(window.location.hash)
  }
  

