import { userRepository } from "../Repository/userRepo";

const userService = async (Data: {
  username: string;
  email: string;
  password: string;
}) => {
  const createUser = userRepository.createUser({
    email: Data.email.toLowerCase(),
    username: Data.username,
    password: Data.password,
  });
  return createUser;
};

const loginUser = async (Data: { email: string; password: string }) => {
  const userLogin = await userRepository.verifyUser({
    email: Data.email,
    password: Data.password,
  });
  return userLogin;
};

const getUserDataService = async (Email: string) => {
  try {
    const getUsernameandId = await userRepository.getUserData(Email);
    return getUsernameandId;
  } catch (error) {
    throw new Error("Failed in service layer to get User.name and user.id");
  }
};

const modifyUserData = async (
  userId: number,
  data: {
    university?: string;
    major?: string;
    description?: string;
    portfolo?: string;
  },
) => {
  return userRepository.modifyData(userId, data);
};

export { userService, loginUser, getUserDataService, modifyUserData };
