import MockFirebase from 'mock-cloud-firestore';
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          idUser : 'abc123',
          name : 'Daiana',
          photo :  'abc.png',
          email : 'diana@gmail.com',
          birthdate : '18/05/1998',
          infoDoramas :"Me gusta  los doramas",
          infoPersonal :"Soy soltera",          
        },
        abc456: {
            idUser : 'abc456',
            name : 'Leslie',
            photo :  'abcd.png',
            email : 'leslie@gmail.com',
            birthdate : '18/05/1997',
            infoDoramas :"Me gusta  los doramas",
            infoPersonal :"Teengo 21 años",
        },        
      }
    }
  }
 };

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { setUser ,getUser,updateUser} from '../src/controller/user.js';

describe('setUser', () => {
  it('Debería porder guardar los datos del usuario', (done) => {
    return setUser('abc789','fiorelly','fiorelly@gmail.com','abcde.png')
      .then(() => {
        getUser(
          'abc789', data =>{
            expect(data.idUser).toBe('abc789');
            done()
          })
      });            
  });
});

/* describe('UpdateUser', () => {
  it('Debería porder guardar los datos del usuario', (done) => {
    return setUser('abc789','fiorelly','fiorelly@gmail.com','abcde.png')
      .then(() => {
        getUser(
          'abc789', data =>{
            expect(data.idUser).toBe('abc789');
            done()
          })
      });            
  });
}); 
*/

describe('getUser',()=>{
  it('deberia ser una funcion ',()=>{
    expect(typeof getUser).toBe('function')
  });

  it.only('Deberia poder mostrar los datos del documento con el id abc456 ' ,(done)=>{
    const callback = (user)=>{
      console.log(user)
      //expect(data.idUser).toEqual('abc456')
      done()
    }
       
        
    getUser('abc456', callback)
    
  });
}); 







