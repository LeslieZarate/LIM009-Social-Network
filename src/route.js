import Header from "./view/header.js"
import Home from "./view/home.js"
import Login from "./view/login.js"
import Account from "./view/account.js"
import Profile from "./view/profile.js"
import Error from "./view/404.js"

import {userData} from "./view-controller.js"


const changeTmp = (hash) => {
    if (hash === '#/' || hash === '' || hash === '#') {
      return viewTmp('#/home');
    } else if (hash === '#/home'|| hash === '#/signIn' ||  hash ==='#/account'|| hash === '#/profile') {
      return viewTmp(hash);
    } else {
      return viewTmp();
    }
  }
  
  const viewTmp = (router) => {
   // const router = routers.substr(2, routers.length - 2)
    const root = document.getElementById('root');
    root.innerHTML = '';
    switch (router) {      
      case '#/home':
      userData((user)=>{  
       // console.log(user)             
        root.appendChild(Header(user));        
      });
      root.appendChild(Home());
      
      break;

      case '#/signIn':
      root.appendChild(Login());
      break;

      case '#/account':
      root.appendChild(Account());
      break;         
      
      case '#/profile':
      userData((user) => {        
        root.appendChild(Header(user));
        root.appendChild(Profile(user)); 
      })
      break;
        
     default:
      root.appendChild(Error());
      break;
    }

  }
  

 export const initRouter = () => {
    window.addEventListener('load', changeTmp(window.location.hash))
    if (("onhashchange" in window)) window.onhashchange = () => changeTmp(window.location.hash)
  }
  
