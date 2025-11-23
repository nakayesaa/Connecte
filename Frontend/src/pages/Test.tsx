import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Test = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="relative py-32 bg-black w-2/5 rounded-2xl h-80 mt-36">
        <div className="absolute z-0 top-2 left-1/2 -translate-x-1/2 w-[97%] h-1/2 rounded-lg bg-slate-500"></div>
        <div className="flex-col absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <div className="rounded-full h-40 w-40 bg-slate-200 shadow-[0_0_0_8px_rgba(0,0,0,0.3)]"></div>
          <div className="text-2xl mt-4 text-stone-300">Hajendra</div>
          <div className="text-muted-foreground">Google Software Engineer</div>
          <div className="flex flex-row space-x-8 mt-4">
            <Link to={""}>
              <FaLinkedin className="text-xl text-stone-200"></FaLinkedin>
            </Link>
            <Link to={""}>
              <FaGithub className="text-xl text-stone-200"></FaGithub>
            </Link>
            <Link to={""}>
              <FaInstagram className="text-xl text-stone-200"></FaInstagram>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
