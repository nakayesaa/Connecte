import { Post } from "@/types"
import { Medal, Code, Share, ThumbsUp, Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

const renderPost = (posts : Post[])=>{

    const [hover, setHover] = useState<string | null >(null);
    const [send, setSend] = useState(false);

    const handleSend = ()=>setSend(true);

    return posts.length === 0 ? (
      <p className="text-center text-muted-foreground">No posts found</p>
    ) :(
      posts.map((post) =>(
            <div onMouseEnter={()=>setHover(post.id)} onMouseLeave={()=>setHover(null)} key={post.id} className="border-4 border-slate-900 rounded-xl bg-white 
                shadow-[8px_8px_0_0_#1e293b] 
                hover:shadow-[12px_12px_0_0_#1e293b] 
                transition-all duration-100 p-6">

            <div className="flex justify-between items-start">
                <div>
                <div className="flex flex-row items-center space-x-3">
                    <div className="inline-flex items-center space-x-1 border border-blue-900 bg-blue-50/50 rounded-full py-1 px-6">
                    <Medal className="text-blue-900"></Medal>
                    <div className="text-sm text-blue-900 font-bold">
                        {post.type}
                    </div>
                    </div>
                    <div className="text-2xl font-bold ml-auto mr-auto">{post.title}</div>
                </div>
                <div className="text-gray-600 mt-2 whitespace-pre-line">
                    {post.content || "No description provided."}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {post.role && post.role.split(",").filter(role => role.trim() != "").map((role)=>{
                        return (
                            <div className="px-3 py-1 text-xs rounded-full bg-slate-300">{role.trim()}</div>
                        )
                    })}
                </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                    {post.PostOwner?.username
                        ? post.PostOwner.username.charAt(0).toUpperCase() : "X"}
                    </div>
                    <div>
                        <div className="font-medium">
                            {post.PostOwner?.username || "Unknown User"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {new Date(post.createdat).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <button className="text-sm"> 
                        <ThumbsUp className="text-sm"></ThumbsUp>  
                    </button>
                    <button>
                        <Bookmark></Bookmark>
                    </button>
                    <button>
                        <Share></Share>
                    </button>
                    <button className="px-4 py-2 bg-slate-700 text-white text-md rounded-lg hover:bg-slate-950">    
                        Send Request
                    </button>
                </div>
            </div>
            </div>
      ))
    )
}

export{
    renderPost
}