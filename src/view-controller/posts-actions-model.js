import { addLikePost ,deleteLikePost} from "../controller/posts-actions.js";

export const addLikePostSubmit = (objPost,objUser)=>{
    addLikePost(objPost.id,objUser.uid,objUser.email)
}

export const deleteLikePostSubmit = (objPost,userLike)=>{
    deleteLikePost(objPost.id,userLike.id)
}