import account from './view/account.js'
import login from './view/login.js'
import home from './view/home.js'

export const initRoute = ()=>{
    const root = document.getElementById('root');
    root.appendChild(login());

    return root;
}


