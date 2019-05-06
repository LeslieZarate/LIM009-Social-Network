/*
// importamto el mock 
 import MockFirebase from '../_mocks_/firebase-mocks.js'
 global.firebase = MockFirebase()  // de manera global ,que toda las declaracion e de firebase van ser remplasados por el mock
*/

// configurando firebase mock
const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();

mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
	// use null if your code does not use RTDB
	path => (path ? mockdatabase.child(path) : null),
	() => mockauth,
	() => mockfirestore
);

import { signUp, signIn, signInGoogle, signInFacebook ,signOut } from "../src/controller/controller-firebase.js";

describe('SignUp', () => { 
    it('Deberia ser una funcion:', ()=>{
		expect(typeof signUp).toBe('function')
		});
		
		it('Debería poder iniciar sesion', () => {
			return signUp('admin@dramafever.com.pe', '123456')
				.then((user) => {
					expect(user.email).toBe('admin@dramafever.com.pe')
				})
		});
});

describe('SignIn', () => {
	it('Deberia ser una funcion:', () => {
		expect(typeof signIn).toBe('function')
	});

	it('Debería poder iniciar sesion', () => {
		return signIn('admin@dramafever.com.pe', '123456')
			.then((user) => {
				expect(user.email).toBe('admin@dramafever.com.pe')
			})
	});
});

describe('SignInGoogle', () => {
	it('Deberia ser una funcion:', () => {
		expect(typeof signInGoogle).toBe('function')
	});

	it('Debería poder iniciar sesion con una Cuenta de Google', () => {
		return signInGoogle('admin@gmail.com', '123456')
			.then((user) => {
				expect(user.email).toBe();
			})
	})
});

describe('SignInFacebook', () => {
	it('Deberia ser una funcion:', () => {
		expect(typeof signInFacebook).toBe('function');
	});

	it('Debería poder iniciar sesion con una Cuenta de Facebook', () => {
		return signInFacebook('admin@hotmail.com', '123456')
			.then((user) => {
				expect(user.email).toBe();
			})
	})
});

describe('SignOut', () => {
	it('Deberia ser una funcion:', () => {
		expect(typeof signOut).toBe('function')
	});

	it('Debería poder Cerrar Sesion', () => {
		return signOut()
			.then(() => {
				expect().toBe();
			})
	})
});