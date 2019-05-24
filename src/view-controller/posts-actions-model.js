import { addLikePost } from "../controller/posts-actions.js";

export const addLikePostSubmit = (objPost,objUser)=>{
    addLikePost(objPost.id,objUser.uid,objUser.email)
    
}