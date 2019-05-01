// configurando firebase mock
const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockprovider = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockprovider.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockprovider,
  () => mockfirestore
);

// iniciando tests

import { signIn, signInGoogle, signInFacebook, signUp } from "../src/controller/controller-firebase.js";

describe('Drama Fever', () => {
  it('Debería poder iniciar sesion', () => {
    return signIn('admin@dramafever.com.pe', '123456')
      .then((user) => {
        expect(user.email).toBe('admin@dramafever.com.pe')
      })
  })
});

describe('Drama Fever', () => {
  it('Debería poder iniciar sesion con una Cuenta de Google', () => {
    return signInGoogle('admin@gmail.com', '123456')
      .then((user) => {
        expect(user.email).toBe()
      })
  })
});

describe('Drama Fever', () => {
  it('Debería poder iniciar sesion con una Cuenta de Facebook', () => {
    return signInFacebook('admin@hotmail.com', '123456')
      .then((user) => {
        expect(user.email).toBe()
      })
  })
});

describe('Drama Fever', () => {
  it('Debería poder Cerrar Sesion', () => {
    return signUp('admin@dramafever.com.pe', '123456')
      .then((user) => {
        expect(user.email).toBe('admin@dramafever.com.pe')
      })
  })
})
