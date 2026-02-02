import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Compass,
  User,
  Globe,
  GraduationCap,
  BookOpen,
  Edit3,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UsegetAllUserData, useUpdateUserData } from "@/hooks/useUser";
import { RecruitDropdownMenu } from "@/components/DropdownMenu";
import ProfileInput from "@/components/ui/customProfileInput";

const Profile = () => {
  const [change, setChange] = useState(false);
  const [data, setData] = useState({
    university: "",
    major: "",
    description: "",
    portfolo: "",
  });

  const { data: user, isLoading: userIsLoading } = UsegetAllUserData();
  const { mutateAsync: triggerUpdate } = useUpdateUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setData({
        university: user.university || "",
        major: user.major || "",
        description: user.description || "",
        portfolo: user.portfolo || "",
      });
    }
  }, [user]);

  const changeData = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const saveUserData = async () => {
    try {
      await triggerUpdate(data);
      setChange(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (userIsLoading || !user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        Loading Profile
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-white/20">
      {/* header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto flex h-20 items-center justify-between px-6 relative">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#161616] border border-white/10">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">Connecte</span>
              <span className="text-[10px] uppercase tracking-widest text-[#71717A]">
                Where Engineers Gather
              </span>
            </div>
          </Link>
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-2 bg-[#161616] border border-white/5 p-1 rounded-2xl">
            <button
              onClick={() => navigate("/discover")}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-[#71717A] hover:text-white transition-all text-sm font-medium"
            >
              <Compass size={16} /> Discover
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/5 text-white text-sm font-medium"
            >
              <User size={16} /> Profile
            </button>
          </nav>
          <div className="w-[100px]" /> {/* Spacer for balance */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        {/* profile */}
        <div className="bg-[#161616] border border-white/5 rounded-[32px] overflow-hidden relative mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[80px] rounded-full -mr-20 -mt-20" />
          <div className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative group">
                <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-[#1F1F1F] to-[#0A0A0A] border border-white/10 flex items-center justify-center text-4xl font-bold shadow-2xl transition-transform group-hover:scale-105">
                  {user.username?.[0] || <User size={48} />}
                </div>
                {change && (
                  <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl text-black shadow-lg">
                    <Edit3 size={14} />
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      {user.username}
                    </h1>
                    <p className="text-[#A1A1AA] text-lg font-light mt-1">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={change ? saveUserData : () => setChange(true)}
                    className={`
                      flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all active:scale-95
                      ${
                        change
                          ? "bg-emerald-500 text-black hover:bg-emerald-400"
                          : "bg-white text-black hover:bg-[#E5E7EB] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      }
                    `}
                  >
                    {change ? (
                      <>
                        <Check size={18} /> saveUserData Changes
                      </>
                    ) : (
                      <>
                        <Edit3 size={18} /> Edit Profile
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <ProfileInput
                    label="University"
                    icon={<GraduationCap size={16} />}
                    value={user.university}
                    disabled={!change}
                    onChange={(val: string) => changeData("university", val)}
                    placeholder="University name"
                  />
                  <ProfileInput
                    label="Major"
                    icon={<BookOpen size={16} />}
                    value={user.major}
                    disabled={!change}
                    onChange={(val: string) => changeData("major", val)}
                    placeholder="Field of study"
                  />
                  <ProfileInput
                    label="Bio"
                    icon={<Edit3 size={16} />}
                    value={user.description}
                    disabled={!change}
                    onChange={(val: string) => changeData("description", val)}
                    placeholder="Flex Yourself"
                  />
                  <ProfileInput
                    label="Portfolio"
                    icon={<Globe size={16} />}
                    value={user.portfolo}
                    disabled={!change}
                    onChange={(val: string) => changeData("portfolo", val)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Posts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold tracking-tight">My Posts</h2>
            <span className="text-sm text-[#71717A] bg-[#161616] px-3 py-1 rounded-full border border-white/5">
              {user.Posts.length} posts
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {user.Posts.length === 0 ? (
              <div className="py-20 text-center bg-[#161616]/30 border border-dashed border-white/10 rounded-3xl">
                <p className="text-[#71717A]">No Posts yet.</p>
              </div>
            ) : (
              user.Posts.map((post: any) => (
                <div
                  key={post.id}
                  className="group relative bg-[#161616]/50 border border-white/5 rounded-3xl p-6 hover:bg-[#161616] hover:border-white/10 transition-all duration-300"
                >
                  <div className="absolute top-6 right-6">
                    <RecruitDropdownMenu postId={post.id} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#A1A1AA] bg-white/5 px-2 py-1 rounded">
                        {post.type || "Other"}
                      </span>
                      <span className="text-[10px] text-[#71717A]">
                        {new Date(post.createdat).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold group-hover:text-white transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[#A1A1AA] mt-2 line-clamp-2 font-light">
                        {post.content || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold">
                          {user.username?.[0]}
                        </div>
                        <span className="text-xs text-[#71717A]">
                          {post.role || "Lead Contributor"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
