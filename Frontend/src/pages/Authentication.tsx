import { useState } from "react";
import { FaGithub, FaGoogle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Authentication = () => {
  const [active, setActive] = useState("signin");

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-slate-950 via-slate-700 to-slate-950 pt-16">
      <div className="relative w-[420px] rounded-3xl bg-black shadow-[0_8px_30px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden">
        <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/70 h-48 flex justify-center items-end border-b border-white/10">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-slate-200 to-slate-600 shadow-[0_0_45px_rgba(255,255,255,0.08),0_0_25px_rgba(0,0,0,0.8)] translate-y-1/2"></div>
        </div>
        <div className="flex flex-col items-center pt-20 pb-10 px-8">
          <div className="text-white text-3xl font-bold tracking-wide">
            Welcome
          </div>
          <div className="flex gap-8 mt-4 text-lg font-medium relative">
            {["signin", "register"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`transition ${
                  active === tab
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === "signin" ? "Sign In" : "Register"}
              </button>
            ))}
            <span
              className={`absolute -bottom-[6px] h-[3px] bg-white rounded-full transition-all duration-300 ${
                active === "signin" ? "left-0 w-[58px]" : "left-[95px] w-[75px]"
              }`}
            />
          </div>
          {active === "signin" && (
            <div className="flex flex-col gap-3 w-full mt-10">
              <button
                onClick={() => {
                  window.location.href = "http://localhost:3001/auth/google";
                }}
                className="w-full py-3 bg-gradient-to-r from-white/40 via-white/10 to-white/5 rounded-full border text-white hover:bg-white/10 transition font-medium"
              >
                Sign in with Google
              </button>
              <button className="w-full py-3 bg-gradient-to-r from-white/30 via-white/20 to-white/5 rounded-full border text-white hover:bg-white/10 transition font-medium">
                Sign in with Email
              </button>
              <button
                onClick={() => {
                  window.location.href = "http://localhost:3001/auth/github";
                }}
                className="w-full py-3 bg-gradient-to-r from-white/10 via-white/15 to-white/25 rounded-full border text-white hover:bg-white/10 transition font-medium"
              >
                Sign in with Github
              </button>
            </div>
          )}
          {active === "register" && (
            <div className="flex flex-col gap-3 w-full mt-10">
              <button className="w-full py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition font-medium">
                Register with Google
              </button>
              <button className="w-full py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition font-medium">
                Register with Email
              </button>
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-10">
            Don’t have an account?{" "}
            <span
              onClick={() => setActive("register")}
              className="text-white cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
