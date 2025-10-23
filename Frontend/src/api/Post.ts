import { apiRequest } from "@/lib/apiRequest";
import { CreatePostDTO, Post } from "@/types";

const createPostUrl = "http://localhost:3001/createPost" 
const getAllPost = "http://localhost:3001/getPost" 

export const createPost = async(Data : CreatePostDTO)=>{
    return apiRequest(createPostUrl,{
        method : "POST",
        headers :{
            "content-type" : "application/json"
        },
        body : JSON.stringify(Data),
        credentials : "include"
    })
}

export const getPost = async()=>{
    return apiRequest(getAllPost,{
        method : "GET",
        headers : {
            "content-type" : "application/json"
        },
        credentials : "include"
    })
}
