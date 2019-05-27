const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockAuthentication();
const mockdatabase = new firebasemock.MockFirebase();

export const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
	(path) => {
		return path ? mockdatabase.child(path) : mockdatabase;
	},
	// use null if your code does not use AUTHENTICATION
	() => {
		return mockauth;
	},
	// use null if your code does not use FIRESTORE
	() => {
		return mockfirestore;
	}
);

mockauth.autoFlush();
global.firebase = mocksdk;


import { signUp, signIn, signInGoogle, signInFacebook ,signOut ,currentUser,userActive} from "../src/controller/auth.js";

describe('SignUp', () => { 
    it('Deberia ser una funcio:', ()=>{
		expect(typeof signUp).toBe('function')
		});
		
		it('Debería poder crear cuenta con ', () => {
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
				expect(user.providerData[0].providerId).toBe('google.com');
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
				expect(user.providerData[0].providerId).toBe('facebook.com');
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

describe('currentUser', () => {
  it('deberia tener usuario activo', (done) => {
    signIn('admin@dramafever.com.pe', '123456')
      .then(() => {
        const user = currentUser();
        expect(user.email).toEqual('admin@dramafever.com.pe');
        done()
      })
  })
})

describe('activeUser', () => {
  it('deberia tener usuario activo', (done) => {
        const callback = user =>{
						console.log(user)
						expect(user.email).toEqual('admin@dramafever.com.pe');
						done()
			}
			userActive(callback);
			signIn('admin@dramafever.com.pe', '123456');	
	});	
});



