import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Plus, Search, Compass, User, LogOut } from "lucide-react";
import CreatePost from "./CreatePost";
import { useGetUsername, useLogout } from "@/hooks/useUser";
import { useGetAllPosts } from "@/hooks/usePosts";
import { RenderPosts } from "@/components/RenderPosts";
import CustomInput from "@/components/ui/customInput";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("project");

  const { data: user } = useGetUsername();
  const { mutateAsync: triggerLogout } = useLogout();
  const { data: posts } = useGetAllPosts();

  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await triggerLogout();
      navigate("/authentication");
    } catch {
      console.error("Logout failed:");
    }
  };
  const filteredPosts =
    posts?.filter((p) => {
      const query = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query)
      );
    }) ?? [];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/20">
      {/* header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto flex h-20 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#161616] border border-white/10 group-hover:border-white/30 transition-all">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">Connecte</span>
              <span className="text-[10px] uppercase tracking-widest text-[#71717A]">
                Where Engineers Gather
              </span>
            </div>
          </Link>

          {/* Center */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-2 bg-[#161616] border border-white/5 p-1 rounded-2xl">
            <button
              onClick={() => navigate("/discover")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                window.location.pathname === "/discover"
                  ? "bg-white/5 text-white"
                  : "text-[#71717A] hover:text-white"
              }`}
            >
              <Compass size={16} /> Discover
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-[#71717A] hover:text-white transition-colors text-sm font-medium"
            >
              <User size={16} /> Profile
            </button>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-white">
                    {user.username}
                  </span>
                  <button
                    onClick={logout}
                    className="text-[10px] text-[#71717A] hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <LogOut size={10} /> Logout
                  </button>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#161616] to-[#222] border border-white/10" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/authentication">
                  <button className="text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium px-4 py-2">
                    Login
                  </button>
                </Link>
                <Link to="/authentication">
                  <button className="bg-[#161616] border border-white/10 text-white px-6 py-2 rounded-full text-sm font-medium hover:border-white/30 transition-all active:scale-95">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* main part */}
      <main className="max-w-[1200px] mx-auto py-12 px-6 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-12">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter mb-4">
              Discover Projects
            </h1>
            <p className="text-[#A1A1AA] text-lg max-w-md font-light">
              Explore real-world challenges and find the perfect team to build
              with.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-[#E5E7EB] transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Plus size={18} /> Create Post
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <CustomInput
              placeholder="Search by keywords, skills, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex bg-[#161616] p-1 rounded-2xl border border-white/5">
              {["project", "competition"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                    activeTab === tab
                      ? "bg-white/10 text-white"
                      : "text-[#71717A] hover:text-[#A1A1AA]"
                  }`}
                >
                  {tab}s
                </button>
              ))}
            </div>
          </div>
          <RenderPosts posts={filteredPosts} userId={user ? user.userId : 0} />
        </div>
      </main>
      <CreatePost open={open} close={() => setOpen(false)} />
    </div>
  );
};

export default Discover;
