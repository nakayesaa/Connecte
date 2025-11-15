import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Users, Compass, User, AlertCircle, AlertOctagon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getData, update } from "@/api/User";
import { RecruitDropdownMenu } from "@/components/DropdownMenu";

const Profile = () => {
  const [change, setChange] = useState(false);
  const [data, setData] = useState<any>({
    username: "",
    email: "",
    university: "",
    major: "",
    description: "",
    portfolo: "",
    Posts: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData();
      setData(userData.data);
    };
    fetchData();
  }, []);

  const changeData = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const save = async () => {
    const updated = await update({
      university: data.university,
      major: data.major,
      description: data.description,
      portfolo: data.portfolo,
    });

    setData((prev) => ({ ...prev, ...updated.Data }));
    setChange(false);
  };
  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">Connecte</span>
              <span className="text-xs text-muted-foreground">
                Where Engineers Gather
              </span>
            </div>
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              onClick={() => navigate("/discover")}
              className="flex items-center gap-1 px-4 py-1 rounded text-slate-600 hover:font-bold"
            >
              <Compass className="h-5 w-5 text-muted-foreground" />{" "}
              Discover{" "}
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-1 text-slate-600 px-4 py-1 rounded hover:font-bold"
            >
              <User className="h-5 w-5 text-muted-foreground" />
              Profile
            </button>
          </div>
        </div>
      </header>
      <main className="container py-12">
        <h1 className="text-3xl font-bold text-center mb-2">My Profile</h1>
        <div className="text-muted-foreground text-center mb-8">
          Flex Yourself
        </div>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center text-3xl font-semibold text-white">
              {data.username?.[0] || "U"}
            </div>
            <div className="mt-3 text-xl font-bold">{data.username}</div>
            <div className="text-muted-foreground">{data.email}</div>
          </div>
          <div className="space-y-5">
            <div>
              <div className="text-sm font-medium text-slate-700">
                {" "}
                University{" "}
              </div>
              <Input
                value={data.university || " "}
                disabled={!change}
                onChange={(e) => changeData("university", e.target.value)}
                placeholder=" "
              />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-700">Major</div>
              <Input
                value={data.major || " "}
                disabled={!change}
                onChange={(e) => changeData("major", e.target.value)}
                placeholder=" "
              />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-700">Bio</div>
              <Input
                value={data.description || ""}
                disabled={!change}
                onChange={(e) => changeData("description", e.target.value)}
                placeholder="tell about yourself"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-700">
                {" "}
                Portfolio/Website{" "}
              </div>
              <Input
                value={data.portfolo || ""}
                disabled={!change}
                onChange={(e) => changeData("portfolo", e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {!change ? (
              <Button
                onClick={() => setChange(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={save}
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-10">
          <div className="text-2xl font-bold mb-4 text-center">My Posts</div>
          <div className="space-y-6 mt-8">
            {data.Posts.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No posts found
              </div>
            ) : (
              data.Posts.map((post: any) => (
                <div
                  key={post.id}
                  className="relative border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 p-6"
                >
                  <div className="absolute top-3 right-3 mt-2">
                    <RecruitDropdownMenu postId={post.id} />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-blue-600 font-semibold capitalize">
                        {post.type || "Others"}
                      </div>
                      <div className="text-xl font-bold mt-1">{post.title}</div>
                      <div className="text-gray-600 mt-2">
                        {post.content || "No description"}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.role && (
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 text-xs rounded-full">
                            {post.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                      {data.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{data.username}</div>
                      <div className="text-xs text-muted-foreground">
                        {data.university || "No university"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(post.createdat).toLocaleDateString()}
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
