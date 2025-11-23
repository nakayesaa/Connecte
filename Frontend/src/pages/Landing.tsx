import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import RoamingCube from "@/components/RoamingCube";
import ParticleTextThree from "@/components/textDrop";

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-800 to-black" />
        <div className="absolute inset-0 z-20 opacity-70">
          <ParticleTextThree />
        </div>
      </div>
      <div className="relative z-20 container py-20 md:py-32">
        <div className="flex flex-col items-center text-center gap-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Where Engineers Gather
            </span>
          </div>
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white">
            Find Your Perfect Team for Your Next Big Plan
          </div>
          <div className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Connect with engineers, tech students, and ambitious college
            students. Join competitions, build real-world projects, and
            collaborate with talented peers.
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth">
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
    </div>
  );
};

export default Landing;
