import prismaClient from "../prismaClient";
import { createPostDTO } from "../types";

export const Posts = {
    findPost : async function(searchQuery : string){
        return await prismaClient.post.findMany({
            where : {
                title : {
                    "contains" : searchQuery,
                }
            }
        })
    },
    createPost : async function(Data : createPostDTO, userId : number){
        return await prismaClient.post.create({
            data : {
                title : Data.title,
                content : Data.content,
                role : Data.role,
                type : Data.type,
                PostOwner : {
                    connect : {
                        id : userId
                    }
                }
            }
        })
    },
}