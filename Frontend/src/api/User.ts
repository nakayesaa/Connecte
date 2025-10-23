import { apiRequest } from "@/lib/apiRequest"
import { loginDTO, signupDTO, User } from "@/types"
import { BookDashed } from "lucide-react"
import { json } from "stream/consumers"

const urlSignup = "http://localhost:3001/signup"
const urlLogin = "http://localhost:3001/login"
const urlgetUsername = "http://localhost:3001/getUsername"
const urlLogout = "http://localhost:3001/logout"
const urlGetData = "http://localhost:3001/getData"
const urlUpdate = "http://localhost:3001/update";

export const createUser = async(Data : signupDTO)=>{    
    return apiRequest(urlSignup,{
        method : "POST",  
        headers : {
            "content-type" : "application/json",
        },
        body : JSON.stringify(Data)
    })
}
export const loginUser = async(Data : loginDTO)=>{
    return apiRequest(urlLogin, {
        method : "POST",
        headers : {
            "content-type" : "application/json",
        },
        body:JSON.stringify(Data)
    })
}

export const getUsername = async()=>{
  return apiRequest(urlgetUsername, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  });
};

export const userLogout = async()=>{
  return apiRequest(urlLogout,{
    method : "POST",
    headers : {
      "content-type" : "application/json"
    }
  })
}

export const getData = async()=>{
  return apiRequest(urlGetData, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  });
};

export const update = async (data: {
  university?: string;
  major?: string;
  description?: string;
  portfolo?: string;
})=>{
  return apiRequest(urlUpdate,{
    method : "PATCH",
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify(data)
  })
};

