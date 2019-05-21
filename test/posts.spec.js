import MockFirebase from 'mock-cloud-firestore';
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          idUser : '1',
          name : 'Daiana',
          photo :  'abc.png',
          textPost : 'probando agregar un post',
          privacy : 'privado',
          date : '18/05/19',
          likes :2,
        },
        abc456: {
            idUser : '2',
            name : 'Leslie',
            photo :  'abcd.png',
            textPost : 'probando agregar un post 1',
            privacy : 'publico',
            date : '18/05/19',
            likes :3,
          },
        abc789: {
          idUser : '3',
          name : 'Leslie',
          photo :  'abcd.png',
          textPost : 'este es un post Publico',
          privacy : 'publico',
          date : '17/05/19',
          likes :3,
        },
      }
    }
  }
 };
 global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });import { getAllPosts,getPublicPosts, addNote, deleteNote, updateNote} from '../src/controller/controller-firebase.js';
 
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

describe('addNote', () => {
  it('Debería porder agregar un post', (done) => {
    return addNote('2','Leslie','abcd.png','probando agregar un post','public','17/05/19',3)
      .then(() => getAllPosts(
        (data) => {
          const result = data.find((note) => note.textPost === 'probando agregar un post');
          expect(result.textPost).toBe('probando agregar un post');
          done()
        }
      ));
  });
 });
 

describe('updateNote',()=>{
  it('Debería poder editar un post', (done) => {
    const data = {
      textPost : 'post modificado'
    }
    return updateNote('abc456', data)
      .then( ()=> getAllPosts(
        (posts) =>{
          const result = posts.find((post) => post.textPost === 'post modificado');
          expect(result.textPost).toBe('post modificado');
          done()
        }
      ));
  })
});
  
describe('deleteNote',()=>{
  it('Debería poder eliminar un post', (done) => {
    return deleteNote('abc123')
      .then(() => getAllPosts(
        (data) => {
          const result = data.find((post) => post.id === 'abc123');
          expect(result).toBe(undefined);
          done()
        }
      ));
  });
 });
 
 