import { addNote,deleteNote,updateNote,addLikePost} from "../controller/post.js";
const validate = (number) => {
  if(number<=9){
    number ="0"+number;
  }
  return number 
}
const systemDate = (fullDate )=>{
  const getDate = validate(fullDate.getDate());
  const getMonth = validate(fullDate.getMonth()+1);
  const getFullYear = fullDate.getFullYear()
  
  const minutes =  validate(fullDate.getMinutes());
  const seconds =  validate(fullDate.getSeconds());
  let  hours = validate(fullDate.getHours());
  
  const myClock = `${hours}:${minutes}:${seconds}`;
  const day = `${getDate}/${getMonth}/${getFullYear}`;
  const date = `${day} - ${myClock}`
  return date;  
}

export  const addNoteSubmit = (event) =>{
  event.preventDefault();
  const user = firebase.auth().currentUser;
  const fullDate= new Date();
  const date = systemDate(fullDate); 
  const privacy = document.querySelector('#options-privacy');  
  const textPost = document.querySelector('#text-post');

  if(textPost.value  === ''){
    alert('Ingresa texto')
  }else{    
    addNote(user.uid,user.displayName,user.email,user.photoURL,textPost.value,privacy.value,date)
      .then((doc)=>{  
       // console.log(doc)
       /* userData(user => {
          if(user != null){
            const   data={
               name : user.name,
              photo : user.photo
          }
          updateNote(doc.id,data)
        }
        })   */           
        document.getElementById("form-post").reset();
        alert('Se agrego exitosamente');  
      })
      .catch(error => {
            const errorCode = error.code;
            const  errorMessage = error.message;
            alert( `Error: ${errorMessage} Tipo:${errorCode}`)
      });
  }    
}

export const deleteNoteSubmit = (event) =>{ 
  event.preventDefault();
  console.log(event.target.id) 

  deleteNote(event.target.id)
    .then(()=>{
      console.log('se elimino exitosamente')
    })
    .catch(error => {
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`)
    })
}

export const updateNoteSubmit = (event) => {
  event.preventDefault()
  const btnId = event.target.id;
  const idNote = btnId.substr(9,btnId.length-9) // Identificar que post vamos a actualizar 


  const textNote = document.querySelector(`#post-${idNote}`)
  textNote.readOnly = false;

  // editar el contenido de un post  BOTON SAVE 
  const btnSave = document.querySelector(`#btn-save-${idNote}`)
  btnSave.addEventListener('click',(event)=>{ 
    event.preventDefault()
     
    const  note = {
      textPost : textNote.value     
    }
    updateNote(idNote,note)    
  })

  // editar la privacidad del post BOTON SAVE 
  const privacy = document.querySelector(`#options-${idNote}`);
  privacy.addEventListener('change',(event)=>{    
    event.preventDefault()
    const privacyValue = privacy.value;
    const btnSave = document.querySelector(`#btn-save-${idNote}`)
      btnSave.addEventListener('click',(event)=>{  
        event.preventDefault()  
       
        const  note = {
          textPost : textNote.value,
          privacy : privacyValue
        }
        updateNote(idNote,note)
      });
  });
}

export const updateDislikeSubmit = (event)=>{
 

  /*
  const idBtn = event.target.id;
  const idPost = idBtn.slice(12,32);
  const buttonDislike = document.querySelector(`#btn-dislike-${idPost}`)
  const likes = parseInt(buttonDislike.dataset.likes)
  console.log(likes)
  const note = {
    likes : likes - 1
  }  
  updateNote(idPost,note)*/

}

export const updateLikeSubmit = (event)=>{
  event.preventDefault() 
  /*const idBtn = event.target.id;
  const idPost = idBtn.slice(9,29);
  const buttonlike = document.querySelector(`#btn-like-${idPost}`)  
 
  const likes = parseInt(buttonlike.dataset.likes)
  console.log(likes)
  const note = {
    likes : likes + 1
  }
  
  updateNote(idPost,note)*/

  const idBtn = event.target.id;
  console.log(idBtn)
  const idPost = idBtn.slice(9,29);
  console.log(idPost)
  const user = firebase.auth().currentUser;
  console.log(user.uid)

  addLikePost(idPost,user.uid)

}

