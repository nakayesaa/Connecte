import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ParticleTextThree from "@/components/textDrop";
import React, { useState, useEffect } from "react";

const Landing = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-800 to-black">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="">
          <ParticleTextThree />
        </div>
        <div
          className={`
            text-lg md:text-xl text-slate-300 max-w-2xl text-center mb-4 mt-48
            transition-all duration-700 ease-out transform
            ${showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
          `}
        >
          Connect with engineers, tech students, and ambitious college students.
          Join competitions, build real-world projects, and collaborate with
          talented peers.
        </div>
        <div
          className={`
            flex flex-col sm:flex-row gap-4
            transition-all duration-700 ease-out transform
            ${showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
          `}
        >
          <Link to="/authentication">
            <Button
              size="lg"
              className="
                bg-white/10
                backdrop-blur-md
                text-white font-semibold
                px-10 py-6 tracking-wide
                rounded-xl
                border border-white/40
                shadow-[0_0_25px_rgba(255,255,255,0.2)]
                hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]
                hover:bg-white/20
                transition-all duration-300 ease-out
                hover:scale-[1.05]
              "
            >
              Get Started
            </Button>
          </Link>
          <Link to="/discover">
            <Button
              size="lg"
              className=" bg-amber-500   hover:bg-amber-400
                text-black font-bold
                px-8 py-5 rounded-xl
                shadow-lg shadow-amber-500/30
                transition-all duration-200
                hover:shadow-amber-400/50 hover:scale-[1.03]
              "
            >
              Explore Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
