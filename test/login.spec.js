// Configurando Firebase Mock
const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockprovider = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockprovider.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // Use nulo si su código no usa RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockprovider,
  () => mockfirestore
);

// iniciando Tests
import { signIn, signInGoogle, signInFacebook, signUp, singOut } from "../src/controller/controller-firebase.js";

describe('signIn', () => {
  it('debería ser una función para Autentificaciòn de Email y Password', () => {
    expect(typeof signIn).toBe('function');
  })
});

describe('signInGoogle', () => {
  it('debería ser una función para Autentificaciòn de Google', () => {
    expect(typeof signInGoogle).toBe('function');
  })
});

describe('signInFacebook', () => {
  it('debería ser una función para Autentificaciòn de Facebook', () => {
    expect(typeof signInFacebook).toBe('function');
  })
});

describe('signUp', () => {
  it('debería ser una función para Crear Cuenta', () => {
    expect(typeof signUp).toBe('function');
  })
});

describe('singOut', () => {
  it('debería ser una función para Cerrar Sesiòn', () => {
    expect(typeof singOut).toBe('function');
  })
});

describe('Drama Fever', () => {
  it('Debería poder iniciar sesion con Usuario y Password', () => {
    return signIn('admin@dramafever.com.pe', '123456')
      .then((user) => {
        expect(user.email).toBe('admin@dramafever.com.pe')
      })
  })
});

describe('signInGoogle', () => {
  it('Debería poder iniciar sesion con una Cuenta de Google', () => {
    return signInGoogle()
      .then(() => {
        const user = firebase.auth().currentUser;
        expect(user).not.toBe(null);
      })
  })
});
describe('signInFacebook', () => {
  it('Debería poder iniciar sesion con una Cuenta de Facebook', () => {
    return signInFacebook()
      .then(() => {
        const user = firebase.auth().currentUser;
        expect(user).not.toBe(null);
      })
  })
});

describe('Drama Fever', () => {
  it('Debería poder Crear Cuenta', () => {
    return signUp('admin@dramafever.com.pe', '123456')
      .then((user) => {
        expect(user.email).toBe('admin@dramafever.com.pe')
      })
  })
})
