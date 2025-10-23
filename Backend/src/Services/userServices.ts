
import { userRepository } from "../Repository/userRepo";

const userService = async (Data : {
    username : string,
    email : string
    password : string
})=>{
    const createUser = userRepository.createUser({
        email : Data.email.toLowerCase(),
        username : Data.username,
        password : Data.password,
    })
    return createUser
}

 const loginUser = async(Data : {
    email : string,
    password : string    
})=>{
    const userLogin = await userRepository.verifyUser({
        email : Data.email,
        password : Data.password
    })
    return userLogin;
}

const getUsername = async(Email : string)=>{
    try {
        const getname = await userRepository.getUsername(Email);
        return getname
    } catch (error) {
        throw new Error("Failed in service layer to get Username");
    }
}

const modifyUserData = async (userId: number, data:{
    university?: string;
    major?: string;
    description?: string;
    portfolo?: string;
  })=>{
  return userRepository.modifyData(userId, data);
};

export{
    userService,
    loginUser,
    getUsername,
    modifyUserData
}