export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  university?: string;
  major?: string;
  description?: string;
  portfolo?: string;
  Posts?: Post[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  role: string;
  type: string;
  createdat: string;
  PostOwner: {
    username: string;
    university?: string;
  };
}

export interface signupDTO {
  username: string;
  email: string;
  password: string;
}

export interface loginDTO {
  email: string;
  password: string;
}

export interface CreatePostDTO {
  title: string;
  type : string,
  content: string;
  role: string;
}
