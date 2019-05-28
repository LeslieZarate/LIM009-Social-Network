import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          idUser : '1',
          name : 'Daiana',
          email: 'diana@gmail.com',
          photo :  'abc.png',
          textPost : 'probando agregar un post',
          privacy : 'privado',
          date : '18/05/19',
          
        },
        abc456: {
            idUser : '2',
            name : 'Leslie',
            photo :  'abcd.png',
            email: 'les@gmail.com',
            textPost : 'probando agregar un post 1',
            privacy : 'publico',
            date : '18/05/19',
           
          },
        abc789: {
          idUser : '3',
          name : 'Leslie',
          photo :  'abcd.png',
          email: 'les2@gmail.com',
          textPost : 'este es un post Publico',
          privacy : 'publico',
          date : '17/05/19',
          
        },
      }
    }
  }
 };
 global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
 
 import { getAllPosts,getPublicPosts, addPost,deletePost,updatePrivacyPost,updateTextPost} from '../src/controller/post.js';
 
describe('getAllPosts', () => {
	it('debería leer todos los posts', (done) => {
    return getAllPosts((data) => {
        const result = data.filter((post) => post.privacy);
        expect(result.length).toBe(3);
        done();
      }
    )
  });
});

describe('getPublicPosts', () => {
  it('No debería leer todos los posts privados', (done) => {
    return getPublicPosts((data) => {
			const result = data.find((post) => post.privacy === 'privado');
			expect(result).toBe(undefined);
      done();
      }
    )
  });

  it('debería leer todos los posts públicos', (done) => {
   return getPublicPosts((data) => {
       const result = data.filter((post) => post.privacy === 'publico');
       expect(result.length).toBe(2);
       expect(result[0].textPost).toBe('probando agregar un post 1');
       done();
     }
   )
 });
});

describe('addPost', () => {
  it('Debería porder agregar un post', (done) => {
    return addPost('2','Leslie','les2@gmail.com','abcd.png','probando agregar un post','privado','17/05/19')
      .then(() => getAllPosts(
        (data) => {
          const result = data.find((note) => note.textPost === 'probando agregar un post');
          expect(result.textPost).toBe('probando agregar un post');
          done();
        }
      ));
  });
 });
 

  
describe('deletePost',()=>{
  it('Debería poder eliminar un post', (done) => {
    return deletePost('abc123')
      .then(() => getAllPosts(
        (data) => {
          const result = data.find((post) => post.id === 'abc123');
          expect(result).toBe(undefined);
          done();
        }
      ));
  });
 });
 
 
describe('updatePrivacyPost',()=>{
  it('Debería poder editar un post', (done) => {
    return updatePrivacyPost('abc456', 'privado')
      .then( ()=> getAllPosts(
        (posts) =>{
          const result = posts.filter((post) => post.privacy === 'privado');
          expect(result[0].privacy).toBe('privado');
          done()
        }
      ));
  })
});

describe('updateTextPost',()=>{
  it('Debería poder editar un post', (done) => {
    return updateTextPost('abc789', 'post editado')
      .then( ()=> getAllPosts(
        (posts) =>{
          const result = posts.find((post) => post.textPost === 'post editado');
          expect(result.textPost).toBe('post editado');
          done()
        }
      ));
  })
});
