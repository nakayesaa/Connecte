import { useEffect, useState} from "react";
import { Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users,Plus, Search, Compass, User, LogOut } from "lucide-react";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
import { getUsername, userLogout } from "@/api/User";
import { Post } from "@/types";
import { getPost } from "@/api/Post";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate()
  
  const logout = async()=>{
    const logout = await userLogout();
    if(logout.success) navigate("/auth");
    else console.log(logout.message);
  }
  useEffect(() => {
  const fetchUsername = async () => {
    try {
      const res = await getUsername();
      setUsername(res.data)
    } catch (err) {
      console.error(err);
    }
  };
  fetchUsername();
  }, []);

  useEffect(()=>{
    const getAllPost = async()=>{
      const res = await getPost();
      setPosts(res.posts);
    }
    getAllPost();
  },[])

  useEffect(()=>{
    let filterPost = posts.filter((p)=> p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.role.toLocaleLowerCase().includes(searchQuery.toLowerCase()))
    setFilter(filterPost);
  },[searchQuery,posts])

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold">Connecte</div>
            <div className="text-xs text-muted-foreground">
              Where Engineers Gather
            </div>
          </div>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">
          <button onClick={() => navigate("/discover")} className="flex items-center gap-1 px-4 py-1 rounded text-slate-600 hover:font-bold" >
            <Compass className="h-5 w-5 text-muted-foreground"/>
            Discover
          </button>
          <button onClick={() => navigate("/profile")} className="flex items-center gap-1 text-slate-600 px-4 py-1 rounded hover:font-bold">
            <User className="h-5 w-5 text-muted-foreground"/>
            Profile
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{username}</span>
          <LogOut className="h-5 w-5"></LogOut>
          <button
            onClick={logout}
            className="rounded-md border border-slate-400 text-slate-700 px-3 py-1  hover:font-bold"
          >Logout</button>
        </div>
      </div>
    </header>
      <main className="container py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-3xl font-bold">Discover Projects</div>
            <div className="text-muted-foreground">
              Find your perfect team
            </div>
          </div>
          <Button className="gap-2" onClick={()=>{
            setOpen(true)
          }}>
            <Plus className="h-4 w-4" />
            Create Post
          </Button>
          <CreatePost open={open} close={()=>{
            setOpen(false)
          }}/>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by keywords, skills, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Tabs>
          <div className="justify-center flex">
            <TabsList>
              <TabsTrigger value="project">Projects</TabsTrigger>
              <TabsTrigger value="competition">Competitions</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <div className="space-y-6 mt-8">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts found</p>
          ) : (
            filter.map((post) =>(
              <div key={post.id} className="border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-blue-600 font-semibold capitalize">
                      {post.type || "Others"}
                    </div>
                    <div className="text-xl font-bold mt-1">{post.title}</div>
                    <div className="text-gray-600 mt-2 whitespace-pre-line">
                      {post.content || "No description provided."}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.role && (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 text-xs rounded-full">
                          {post.role}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Send a Request
                  </Button>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                    {post.PostOwner?.username
                      ? post.PostOwner.username.charAt(0).toUpperCase() : "X"}
                  </div>
                  <div>
                    <div className="font-medium">
                      {post.PostOwner?.username || "Unknown User"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {post.PostOwner?.university || "No university info"}
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
      </main>
    </div>
  );
};

export default Discover;
