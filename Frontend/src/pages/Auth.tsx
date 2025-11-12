import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { createUser, loginUser } from "@/api/User";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupDTO, loginDTO } from "@/types";
import { toast } from "@/hooks/use-toast";
import { LuGithub } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("Done Creating New User", data);
      toast({
        title: "Account created",
        description: "now you can login",
        variant: "default",
      });
    },
    onError: () => {
      console.log("Failed Creating New User");
    },
  });
};

const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      navigate("/Discover");
      toast({
        title: "succesfully login",
        description: "Welcome back",
      });
      console.log("Full response:", JSON.stringify(data, null, 2));
    },
    onError: (data) => {
      toast({
        title: "Login failed",
        description: "Email or Password might be wrong",
        variant: "destructive",
      });
      console.log("Full response:", JSON.stringify(data, null, 2));
      throw new Error("Login failed");
    },
  });
};

const Auth = () => {
  const [signupData, setSignupData] = useState<signupDTO>({
    username: "",
    password: "",
    email: "",
  });
  const [loginData, setLoginData] = useState<loginDTO>({
    email: "",
    password: "",
  });

  const signupHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const newUser = useCreateUser();
  const userLogin = useLoginUser();
  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newUser.mutate(signupData);
  };
  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userLogin.mutate(loginData);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-700 to-slate-950 flex flex-col items-center justify-center p-2">
      <div className="inline-flex gap-2 px-4 py-4 rounded-full bg-primary/10 border border-primary/20 items-center">
        <Users className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          Where Engineers Gather
        </span>
      </div>
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
            <Users className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">
              Welcome to Connecte
            </h1>
            <p className="text-muted-foreground">Where Engineers Gather</p>
          </div>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 text-slate-900">
            <TabsTrigger value="login" className="">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={loginUser} className="space-y-4">
              <div className="space-y-2 text-slate-600">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  className="bg-slate-200"
                  id="loginEmail"
                  name="email"
                  type="email"
                  placeholder="xxx@unigga.ac.id"
                  onChange={loginHandle}
                  required
                />
              </div>
              <div className="space-y-2 text-slate-400">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  className="bg-slate-200"
                  id="loginPassword"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={loginHandle}
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-primary" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:underline text-primary">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full bg-gray-600">
                submit
              </Button>
            </form>
            <div className="flex items-center gap-2 text-slate-400">
              <div className="flex-grow border-t border-slate-200" />
              <span className="text-xs">or</span>
              <div className="flex-grow border-t border-slate-200" />
            </div>
            <div className="flex justify-center gap-4">
              <Button className="bg-white max-w-sm">
                <LuGithub className="text-slate-800"></LuGithub>
                <div className="text-slate-800">Github</div>
              </Button>
              <Button className="bg-white max-w-sm">
                <FaGoogle className="text-slate-800"></FaGoogle>
                <div className="text-slate-800">Google</div>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={registerUser} className="space-y-4">
              <div className="space-y-2 text-slate-600">
                <Label htmlFor="signupName">Full Name</Label>
                <Input
                  className="bg-slate-200"
                  id="signupName"
                  name="username"
                  type="text"
                  placeholder="prabowo subianto"
                  required
                  onChange={signupHandle}
                />
              </div>
              <div className="space-y-2 text-slate-600">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  className="bg-slate-200"
                  id="signupEmail"
                  name="email"
                  type="email"
                  placeholder="xxx@unigga.ac.id"
                  required
                  onChange={signupHandle}
                />
              </div>
              <div className="space-y-2 text-slate-600">
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  className="bg-slate-200"
                  id="signupPassword"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  onChange={signupHandle}
                />
              </div>
              <Button type="submit" className="w-full bg-gray-600 text-white">
                submit
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
