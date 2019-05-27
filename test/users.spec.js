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
          infoDoramas :'Me gusta  los doramas',
          infoPersonal :'Soy soltera',          
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

describe('UpdateUser', () => {
  it('Debería porder guardar los datos del usuario', (done) => {
    setUser('abc456','leslie','fiorelly@gmail.com','abcde.png')
  return  updateUser('abc456','fiorelly','18/05/1997','tengo 21 años','Me gusta los doramas',)
      .then(() => {
        getUser(
          'abc456', data =>{
            expect(data.name).toEqual('fiorelly');     
            expect(data.birthdate).toEqual('18/05/1997');
            expect(data.infoDoramas).toEqual('Me gusta los doramas');
            expect(data.infoPersonal).toEqual('tengo 21 años');
            done()
          })
      });            
  });
}); 

/*
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
    getUser('abc456', callback);    
  });
}); 
*/






