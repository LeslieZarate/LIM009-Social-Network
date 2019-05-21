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
          privacy : 'privado',
          date : '17/05/19',
          likes :3,
        },
      }
    }
  }
 };
 global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });import {addNote, getAllPosts, deleteNote, updateNote} from '../src/controller/controller-firebase.js';
 describe('Post', () => {
  it('Debería porder agregar un post', (done) => {
    return addNote('2','Leslie','abcd.png','probando agregar un post','privado','17/05/19',3)
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
      )
      )
    })
  });
  
  describe('dleeteNote',()=>{
  it('Debería poder eliminar un post', (done) => {
    return deleteNote('abc123')
      .then(() => getAllPosts(
        (data) => {
          const result = data.find((post) => post.id === 'abc123');
          expect(result).toBe(undefined);
          done()
        }
      ))
  });
 });