import { addLikePost ,deleteLikePost,addComment,deleteComment, updateComment} from "../controller/posts-actions.js";
import { currentUser } from "../controller/auth.js";

export const addLikePostSubmit = (objPost,objUser)=>{
    addLikePost(objPost.id,objUser.uid,objUser.email)
}

export const deleteLikePostSubmit = (objPost,userLike)=>{
    deleteLikePost(objPost.id,userLike.id)
}

export const addCommentSubmit = (objPost,objUser,comment)=>{
    addComment(objPost.id,objUser.uid,objUser.email,objUser.photoURL,comment)
}

export const deleteCommentSubmit = (objComment)=>{
    if(currentUser().uid === objComment.idUser){
        deleteComment(objComment.idPost,objComment.id)
    }    
}

export const updateCommentSubmit = (objComment,newComment)=>{
    if(currentUser().uid === objComment.idUser){
    updateComment(objComment.idPost,objComment.id,newComment);
    }
}