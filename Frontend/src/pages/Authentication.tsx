import React, { useState } from "react";
import {
  FaGithub,
  FaGoogle,
  FaEnvelope,
  FaEye,
  FaArrowLeft,
} from "react-icons/fa";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { authUrls } from "../config/constant.ts";
import CustomAuthButton from "@/components/ui/customAuthButton";

const Authentication = () => {
  const [active, setActive] = useState("signin");
  const [view, setView] = useState("list");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* Left part */}
      <div className="w-full lg:w-[42%] flex flex-col p-8 lg:p-12 relative z-10">
        <Link
          to="/"
          className="absolute top-8 left-8 p-2 rounded-full border border-white/10 bg-[#161616] hover:bg-[#222] transition-colors"
        >
          <ChevronLeft size={20} className="text-[#A1A1AA]" />
        </Link>
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="text-center mb-10">
            <h1 className="text-[#71717A] uppercase tracking-[0.4em] text-4xl font-semibold mb-12">
              Connecte
            </h1>
            <div className="text-3xl font-bold tracking-tight mb-2 text-muted">
              Welcome
            </div>
            <div className="text-sm text-muted-foreground">
              Sign in with your email or connect a github account.
            </div>
            {view === "list" && (
              <div className="flex justify-center gap-8 mt-4 text-sm font-medium relative">
                {["signin", "register"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`transition-colors duration-300 pb-2 ${
                      active === tab
                        ? "text-white"
                        : "text-[#71717A] hover:text-[#A1A1AA]"
                    }`}
                  >
                    {tab === "signin" ? "Sign In" : "Register"}
                  </button>
                ))}
                <span
                  className={`absolute bottom-0 h-[2px] bg-white transition-all duration-300 ${
                    active === "signin"
                      ? "left-[108px] w-[50px]"
                      : "left-[190px] w-[60px]"
                  }`}
                />
              </div>
            )}
          </div>
          {/* List */}
          {view === "list" && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <CustomAuthButton
                icon={FaGoogle}
                text={
                  active === "signin"
                    ? "Sign in with Google"
                    : "Register with Google"
                }
                onClick={() => (window.location.href = authUrls.GOOGLE)}
              />

              {active === "signin" && (
                <CustomAuthButton
                  icon={FaGithub}
                  text="Sign in with Github"
                  onClick={() => (window.location.href = authUrls.GITHUB)}
                />
              )}

              <CustomAuthButton
                icon={FaEnvelope}
                text={
                  active === "signin"
                    ? "Sign in with Email"
                    : "Register with Email"
                }
                onClick={() => setView("email")}
              />

              <p className="text-sm text-[#71717A] mt-10 text-center">
                {active === "signin"
                  ? "Don't have an account? "
                  : "Have an account? "}
                <span
                  onClick={() =>
                    setActive(active === "signin" ? "register" : "signin")
                  }
                  className="text-[#A1A1AA] cursor-pointer hover:text-white hover:underline transition-colors"
                >
                  {active === "signin" ? "Sign up" : "Sign in"}
                </span>
              </p>
            </div>
          )}

          {/* Email UI Form */}
          {view === "email" && (
            <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="relative mb-6">
                <label className="absolute -top-2.5 left-4 bg-[#0A0A0A] px-2 text-[10px] font-bold text-[#71717A] uppercase tracking-widest">
                  Email / Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-[#71717A]/40"
                />
              </div>
              <div className="relative mb-8">
                <label className="absolute -top-2.5 left-4 bg-[#0A0A0A] px-2 text-[10px] font-bold text-[#71717A] uppercase tracking-widest">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-transparent border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-[#71717A]/40"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors"
                >
                  <FaEye />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setView("list")}
                  className="flex items-center gap-2 text-[#71717A] font-semibold hover:text-white transition-colors"
                >
                  <FaArrowLeft className="text-sm" />
                  Back
                </button>
                <button className="bg-white text-black px-10 py-3 rounded-full font-bold hover:bg-[#E5E7EB] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
                  {active === "signin" ? "Sign In" : "Register"}
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="text-center pt-8">
          <div className="text-[#71717A] text-[10px] tracking-widest uppercase">
            © 2026 Connecte -- god bless you
            {/* like bro has the right lol */}
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="hidden lg:flex flex-1 bg-[#111111] m-4 rounded-[40px] border border-white/5 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#161616] to-transparent opacity-40" />
        <div className="relative z-10 text-center px-12">
          {/*3d or image part probably, not yet decided*/}
          <div>dadsd</div>
          <div className="h-80 w-80 mx-auto mb-8" />
          <div>dadad</div>
          {/*3d or image part probably, not yet decided*/}
          <div className="text-4xl font-semibold mb-4 tracking-tight">
            Connect. Build. Solve.
          </div>
          <div className="text-[#A1A1AA] text-lg max-w-sm mx-auto leading-relaxed font-light">
            Join the community of tech students and engineers build Together
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
