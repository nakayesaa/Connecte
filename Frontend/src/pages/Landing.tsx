import { Button } from "@/components/ui/button";
import ParticleTextThree from "@/components/textDrop";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ShinyText from "@/components/ShinyText";
import customAuthButton from "@/components/ui/customAuthButton";

const Landing = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-[#0A0A0A]">
      <nav className="fixed top-0 left-0 right-0 z-30 pt-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`
            relative flex items-center justify-between border-[0.5px] border-white/5
            bg-[#161616] rounded-2xl px-8 py-4
            transition-all duration-1000 delay-300 ease-out transform
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
          `}
          >
            <div className="w-[120px] hidden md:block" />
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8">
              <button className="text-[#71717A] hover:text-white transition-all duration-300 ease-out transform scale-100 hover:scale-125 hover:brightness-125 active:scale-95 text-base font-medium tracking-normal">
                Projects
              </button>
              <button className="text-[#71717A] hover:text-white transition-all duration-300 ease-out transform scale-100 hover:scale-125 hover:brightness-125 active:scale-95 text-base font-medium tracking-normal">
                Competitions
              </button>
              <button className="text-[#71717A] hover:text-white transition-all duration-300 ease-out transform scale-100 hover:scale-125 hover:brightness-125 active:scale-95 text-base font-medium tracking-normal">
                Connect
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/authentication">
                <button className="text-[#A1A1AA] hover:text-white transition-colors duration-200 text-sm tracking-wide">
                  Login
                </button>
              </Link>
              <Link to="/authentication">
                <button className="text-[#A1A1AA] hover:text-white transition-colors duration-200 text-sm tracking-wide">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div>
          <ParticleTextThree />
        </div>

        <div
          className={`
            text-lg md:text-xl text-[#A1A1AA] max-w-2xl text-center mb-8 mt-48
            transition-all duration-700 ease-out transform
            ${showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
          `}
        >
          <ShinyText
            text="
              Connect with engineers, tech students, and ambitious college students.
              Join competitions, build real-world projects, and collaborate with
              talented peers"
            speed={4}
            delay={0}
            color="#b5b5b5"
            shineColor="#333333"
            spread={100}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          ></ShinyText>
        </div>
        <div
          className={`
            transition-all duration-700 delay-200 ease-out transform
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <Link to="/Discover">
            <button
              className="
                group relative overflow-hidden inline-flex items-center justify-center
                px-12 py-2.5 font-medium tracking-tight text-sm text-white/90
                bg-[#121212] rounded-full border border-white/10
                transition-all duration-300 ease-in-out
                hover:border-white/25 hover:text-white
                hover:shadow-[0_0_25px_rgba(255,255,255,0.06)]
                active:scale-95
              "
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <span className="relative flex items-center gap-3">
                Get Started
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
