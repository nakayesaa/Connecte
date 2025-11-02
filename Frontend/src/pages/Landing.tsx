import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import RoamingCube from "@/components/RoamingCube";

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 z-0" />
      <div className="absolute inset-0 z-10 overflow-hidden opacity-60">
        <RoamingCube />
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
            Find Your Perfect
            <span className="text-blue-500"> Team </span>
            for Your Next Big Plan
          </div>
          <div className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Connect with engineers, tech students, and ambitious college students. 
            Join competitions, build real-world projects, and collaborate with talented peers.
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Get Started
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline">
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
