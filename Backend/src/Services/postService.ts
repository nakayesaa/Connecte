import { Posts } from "../Repository/postRepo";
import { createPostDTO } from "../types";

export const postService = async (Data : createPostDTO, userId : number)=>{
    const newPost = await Posts.createPost({
        title : Data.title,
        content : Data.content,
        role : Data.role,
        type : Data.type,
    }, userId);
    return newPost;
}