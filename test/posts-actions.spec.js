import MockFirebase from 'mock-cloud-firestore';
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          idUser : 'xyz654',
          name : 'Daiana',
          email: 'diana@gmail.com',
          photo :  'abc.png',
          textPost : 'probando agregar un post',
          privacy : 'privado',
          date : '18/05/19',
          __collection__:{
            likes :{
              __doc__: {
                xyz987:{
                  idPost:'abc123',
                  idUser:'xyz987',
                  emailUser:'les@gmail.com',
                }
              }              
            },
            comments :{
              __doc__: {
                ab1234:{
                  idUser : 'xyz987',
                  emailUser : 'les@gmail.com',
                  photoUser :'abcd.png',
                  comment :'Me encanta'
                },
                ab5678:{
                  idUser : 'xyz987',
                  emailUser : 'les@gmail.com',
                  photoUser :'abcd.png',
                  comment :'La vere'
                },
              }              
            }   
          },                  
        },
        abc456: {
            idUser : 'xyz987',
            name : 'Leslie',
            photo :  'abcd.png',
            email: 'les@gmail.com',
            textPost : 'probando agregar un post 1',
            privacy : 'publico',
            date : '18/05/19',
                        
        },
      }
    }
  }
 };
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
import { addLikePost, getAllPostLikes, deleteLikePost, addComment, getAllPostComments,deleteComment, updateComment} from '../src/controller/posts-actions';

describe('addLikePost',()=>{
  it('deberia poder agregar like aun post',(done)=>{
    return addLikePost('abc123','xyz654','diana@gmail.com')
    .then(()=>{
      getAllPostLikes('abc123',data=>{
        const result = data.find(like=>like.idUser==='xyz654')
        expect(result.idUser).toBe('xyz654');
        done()
      });
    })
  })
});

describe('deleteLikePost',()=>{
  it('deberia poder eliminar like aun post',(done)=>{
    return deleteLikePost('abc123','xyz987')
    .then(()=>{
      getAllPostLikes('abc123',data=>{
        const result = data.find(like=>like.idUser==='xyz987')
        expect(result).toBe(undefined);
        done()
      });
    })
  })
});

describe('addComment',()=>{
  it('deberia poder agregar un comentario aun post',(done)=>{
    return addComment('abc123','xyz654','diana@gmail.com','abc.png','tambien quiero verla')
    .then(()=>{
      getAllPostComments('abc123',comments=>{
        const result = comments.find(data=>data.comment==='tambien quiero verla');
        expect(result.comment).toBe('tambien quiero verla');
        done()
      });
    })
  })
});

describe('deleteComment',()=>{
  it('deberia poder agregar un comentario aun post',(done)=>{
    return deleteComment('abc123','ab1234')
    .then(()=>{
      getAllPostComments('abc123',comments=>{
        const result = comments.find(data=>data.comment==='Me encanta');
        expect(result).toBe(undefined);
        done()
      });
    })
  })
});

describe('addComment',()=>{
  it('deberia poder agregar un comentario aun post',(done)=>{
    return updateComment('abc123','ab5678','comentario editado')
    .then(()=>{
      getAllPostComments('abc123',comments=>{
        const result = comments.find(data=>data.comment==='tambien quiero verla');
        expect(result.comment).toBe('tambien quiero verla');
        done()
      });
    })
  })
});