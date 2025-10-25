import prismaClient from "../prismaClient";
import { hashPassword, verifyPassword } from "../utils/hash";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
export const userRepository = {
    findEmail : async function(email : string){
        return prismaClient.user.findUnique({
            where : {
                email
            }
        })
    },
    createUser : async function(Data:{
        username : string,
        email : string,
        password : string
    }){
        const emailExist = await this.findEmail(Data.email);
        if(!emailExist){
            const hashedPassword = await hashPassword(Data.password);
            return prismaClient.user.create({
                data : {
                    "username" : Data.username,
                    "email" : Data.email,
                    "password" :hashedPassword
                }
            })
        }
    },
    verifyUser : async function(Data : {
        email : string,
        password : string
    }){
        const emailExist = await this.findEmail(Data.email);
        console.log(Data.email, emailExist);
        if(!emailExist) throw new Error("Email didnt exist");
        const User = await prismaClient.user.findUnique({
            where : {
                email : Data.email
            }
        })
        const verifyPassw = await verifyPassword(Data.password,User?.password);
        if(!verifyPassw) throw new Error("invalidPassword");
        const token = jwt.sign({
            id : User?.id,
            email : User?.email,
        }, process.env.SECRET_TOKEN as string, {expiresIn : '1h'})
        return{
            success : true,
            Data : {
                username : User?.username,
                email : User?.email
            },
            token
        }
    },
    getUsername : async(email : string)=>{
        const user = await prismaClient.user.findUnique({
            where : {
                email
            }
        })
        if(!user) throw new Error("Email didnt exist");
        return user.username
    },
    modifyData : async(userId : number , Data : {
        university?: string;
        major?: string;
        description?: string;
        portfolo?: string;
    })=>{
        return await prismaClient.user.update({
            where : {
                id : userId
            },
            data : Data
        })
    }
}