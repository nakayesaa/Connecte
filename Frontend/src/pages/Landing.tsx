import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero ">
      <div className="container py-20 md:py-32">
        <div className="flex flex-col items-center text-center gap-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Where Engineers Gather</span>
          </div>  
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
            Find Your Perfect
            <span className=" text-blue-600">
              {" "}Team{" "}
            </span>
            for Your Next Big Plan
          </div>
          <div className="text-lg md:text-xl text-muted-foreground max-w-2xl">
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
