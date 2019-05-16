import MockFirebase from 'mock-cloud-firestore';


const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        gsa123: {
          idUser : '1',
          name : 'Diana',
          photo :  'abc',
          textPost : 'probando agregar un post',
          privacy : 'privado',
          date : ' ',
          likes :'2',
        },
        gsa121: {
          idUser : '2',
          name : 'Daiana',
          photo :  'abc',
          textPost : 'probando agregar un post',
          privacy : 'privado',
          date : ' ',
          likes :'3',
        },
        gsa122: {
          idUser : '3',
          name : 'Leslie',
          photo :  'abc',
          textPost : 'probando agregar un post',
          privacy : 'publico',
          date : ' ',
          likes :'5',
        },
        gsa124: {
          idUser : '4',
          name : 'Daiana',
          photo :  'abc',
          textPost : 'probando agregar un post',
          privacy : 'publico',
          date : ' ',
          likes :'1',
        },
        gsa125: {
          idUser : '5',
          name : 'Diana',
          photo :  'abc',
          textPost : 'probando agregar un post',
          privacy : 'publico',
          date : ' ',
          likes :'3',
        }
      }
    }
  }
}


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import {addNote, getPost, deleteNote, updateNote, updateLike, getPostsByPrivacity} from '../src/controller/controller-firebase.js'

describe('Post', () => {
  it('Debería porder agregar un post', (done) => {
    return addNote('probando agregar un post', 'public')
      .then(() => getPost(
        (data) => {
          const result = data.find((note) => note.textPost === 'probando agregar un post');
          expect(result.textPost).toBe('probando agregar un post');
          done()
        }
      ))
  });
  it('Debería poder editar un post', (done) => {
    return updateNote('gsa123','Post modificado')
      .then(() => getPost((data) => {
          const result = data.find((post) => post.textPost === 'Post modificado');
          expect(result.textPost).toBe('Post modificado');
          done();
        }
      ))
  });
  it('Debería dar un like', (done) => {
    return updateLike('gsa123', '1')
    .then(() => getPost(
      (data) => {
        const result = data.find((post) => post.likes === '1');
        expect(result.likes).toBe('1');
        done();
      }
    ))
  });
  it('Debería filtrar por privaciad', (done) => {
    return getPostsByPrivacity('private', (data)=>{      
        expect(data.length).toBe(3);
        data.forEach((post) => {
          expect(post.privacity).toBe('private');
        })         
        done()
    })
  })
  it('Debería poder eliminar un post', (done) => {
    return deleteNote('gsa123')
      .then(() => getPost(
        (data) => {
          const result = data.find((post) => post.id === 'gsa123');
          expect(result).toBe(undefined);
          done()
        }
      ))
  });  
})
