import { useState } from "react";
import { FaGithub, FaGoogle, FaEnvelope, FaEye, FaArrowLeft } from "react-icons/fa";
import { authUrls } from "../config/constant.ts";

const Authentication = () => {
  const [active, setActive] = useState("signin");
  const [view, setView] = useState("list");
  const [showPassword, setShowPassword] = useState(false);

  const AuthButton = ({ icon: Icon, text, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-3 w-full py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15 transition-all duration-200 font-medium group"
    >
      <Icon className="text-lg group-hover:scale-110 transition-transform" />
      <span>{text}</span>
    </button>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 pt-16 font-sans">
      <div className="relative w-[420px] rounded-3xl bg-zinc-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden transition-all duration-500">
        
        <div className="bg-gradient-to-b from-slate-700/50 to-transparent h-52 flex flex-col justify-between items-center py-6 border-b border-white/5">
          <h1 className="text-slate-300/80 uppercase tracking-[0.4em] text-3xl font-semibold">
            Connecte
          </h1>
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] translate-y-1/2 border-4 border-zinc-950"></div>
        </div>

        <div className="flex flex-col items-center pt-20 pb-10 px-10">
          <div className="text-white text-3xl font-bold tracking-tight mb-2">
            {view === "email" ? "Sign In" : "Welcome"}
          </div>
          {view === "list" && (
            <div className="flex gap-8 mt-2 text-lg font-medium relative mb-8">
              {["signin", "register"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`transition-colors duration-300 ${
                    active === tab ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "signin" ? "Sign In" : "Register"}
                </button>
              ))}
              <span
                className={`absolute -bottom-[6px] h-[2px] bg-white rounded-full transition-all duration-300 ${
                  active === "signin" ? "left-0 w-[58px]" : "left-[95px] w-[75px]"
                }`}
              />
            </div>
          )}
          {view === "list" && (
            <div className="flex flex-col gap-3 w-full mt-2">
              <AuthButton
                icon={FaGoogle}
                text={active === "signin" ? "Sign in with Google" : "Register with Google"}
                onClick={() => (window.location.href = authUrls.GOOGLE)}
              />
              <AuthButton
                icon={FaEnvelope}
                text={active === "signin" ? "Sign in with Email" : "Register with Email"}
                onClick={() => setView("email")}
              />
              {active === "signin" && (
                <AuthButton
                  icon={FaGithub}
                  text="Sign in with Github"
                  onClick={() => (window.location.href = authUrls.GITHUB)}
                />
              )}
              
              <p className="text-sm text-slate-500 mt-10 text-center w-full">
                {active === "signin" ? "Don't have an account? " : "Have an account? "}
                <span
                  onClick={() => setActive(active === "signin" ? "register" : "signin")}
                  className="text-slate-200 cursor-pointer hover:text-white hover:underline transition-colors"
                >
                  {active === "signin" ? "Sign up" : "Sign in"}
                </span>
              </p>
            </div>
          )}
          {view === "email" && (
            <div className="flex flex-col w-full mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="relative mb-6">
                <label className="absolute -top-2.5 left-4 bg-zinc-950 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email / Username *
                </label>
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-slate-600"
                />
              </div>
              <div className="relative mb-4">
                <label className="absolute -top-2.5 left-4 bg-zinc-950 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-slate-600"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <FaEye />
                </button>
              </div>
              <div className="text-center mb-10">
                 <p className="text-sm text-slate-500">
                    Forgot <span className="text-slate-300 cursor-pointer hover:underline">Username</span> or <span className="text-slate-300 cursor-pointer hover:underline">Password</span>
                 </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button 
                  onClick={() => setView("list")}
                  className="flex items-center gap-2 text-white font-semibold hover:text-slate-300 transition-colors"
                >
                  <FaArrowLeft className="text-sm" />
                  Back
                </button>
                <button className="bg-white text-black px-10 py-3 rounded-full font-bold hover:bg-slate-200 transition-all shadow-lg">
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;