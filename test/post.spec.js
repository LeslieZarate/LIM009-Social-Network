import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        abc123: {
          name : 'Diana',
          photo :  'abc',
          textPost : 'Prueba Publicaciòn',
          privacy : 'private',
          likes :1,
        },
        abc121: {
          name : 'Daiana',
          photo :  'abs',
          textPost : 'Prueba2',
          privacy : 'public',
          likes :3,
        },
        abc134: {
          name : 'Leslie',
          photo :  'afv',
          textPost : 'Prueba Publicaciòn3',
          privacy : 'private',
          likes :0,
      },
     }
    }
   }
  }


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import {addNote, getPost, deleteNote, updateNote} from '../src/controller/controller-firebase.js'

describe('Post', () => {
  it('Debería porder agregar un post', (done) => {
    return addNote('probando agregar un post', 'public')
      .then(() => getPost(
        (data) => {
          const result = data.find((posts) => posts.textPost === 'probando agregar un post');
          expect(result.textPost).toBe('probando agregar un post');
          done()
        }
      ))
  });
  it('Debería poder editar un post', (done) => {
    return updateNote('abc134','Post modificado')
      .then(() => getPost((data) => {
          const result = data.find((posts) => posts.textPost === 'Post modificado');
          expect(result.textPost).toBe('Post modificado');
          done();
        }
      ))
  }); 

  it('Debería poder eliminar un post', (done) => {
    return deleteNote('abc123')
      .then(() => getPost(
        (data) => {
          const result = data.find((posts) => posts.id === 'abc123');
          expect(result).toBe(undefined);
          done()
        }
      ))
  })
})
