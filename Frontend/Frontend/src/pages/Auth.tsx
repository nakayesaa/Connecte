import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { createUser, loginUser } from "@/api/User";
import {  useMutation,} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupDTO, loginDTO } from "@/types";
import { toast } from "@/hooks/use-toast";

const useCreateUser = ()=>{
  return useMutation({
    mutationFn : createUser,
    onSuccess : (data)=>{
      console.log("Done Creating New User", data);
      toast({
        title : "Account created",
        description : "now you can login",
        variant : "default"
      })
    },
    onError : ()=>{
      console.log("Failed Creating New User");
    }
  })
}

const useLoginUser = ()=>{
  const navigate = useNavigate();
  return useMutation({
    mutationFn : loginUser,
    onSuccess : (data)=>{
      console.log(data);
      navigate("/Discover")
      toast({
        title : "succesfully login",
        description : "Welcome back"
      })
      console.log("Full response:", JSON.stringify(data, null, 2));
    },
    onError : (data)=>{
      toast({
        title : "Login failed",
        description : "Email or Password might be wrong",
        variant : "destructive"
      })
      console.log("Full response:", JSON.stringify(data, null, 2));
      throw new Error("Login failed");
    }
  })
}

const Auth = () => {  
  const [signupData, setSignupData] = useState<signupDTO>({
    "username" : "",
    "password" : "",
    "email" : ""
  })
  const [loginData, setLoginData] = useState<loginDTO>({
    "email" : "",
    "password" : ""
  })

  const signupHandle = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setSignupData({
      ...signupData,
      [e.target.name] : e.target.value
    })
  }
  
  const loginHandle = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }

  const newUser = useCreateUser();
  const userLogin = useLoginUser();
  const registerUser = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    newUser.mutate(signupData);
  };
  const loginUser = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    userLogin.mutate(loginData);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-glow">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
            <Users className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to Connecte</h1>
            <p className="text-muted-foreground">Where Engineers Gather</p>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={loginUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  name="email"
                  type="email"
                  placeholder="xxx@unigga.ac.id"
                  onChange={loginHandle}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={loginHandle}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                submit
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={registerUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signupName">Full Name</Label>
                <Input
                  id="signupName"
                  name="username"
                  type="text"
                  placeholder="prabowo subianto"
                  required
                  onChange={signupHandle}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  name="email"
                  type="email"
                  placeholder="xxx@unigga.ac.id"
                  required
                  onChange={signupHandle}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  id="signupPassword"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  onChange={signupHandle}
                />
              </div>
              <Button type="submit" className="w-full">
                submit
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
