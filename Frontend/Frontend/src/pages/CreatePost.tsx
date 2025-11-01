import React, { useState } from "react";
import { X } from "lucide-react";
import { createPost } from "@/api/Post";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreatePostDTO } from "@/types";

const useCreatePost = ()=>{
  return useMutation({
      mutationFn : createPost,
      onSuccess : (data)=>{
          console.log("Post created succesfully");
          data
      },
      onError : ()=>{
          console.log("fail when creating a post");
      }
  })
}

const CreatePost = ({open,close}:{open:boolean; close:()=>void})=>{

    const [roleInput,setRoleInput] = useState("");
    const [roles,setRoles] = useState<string[]>([]);
    const [type,setType] = useState("");
    const [restData, setRestData] = useState({
        title : "",
        description : ""
    })
    
    const cPost = useCreatePost();
  if(!open) return null;
  const addRole=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        setRoles([...roles, roleInput.trim()]);
        setRoleInput("");
    }
  }

  const deleteRole=(rolee:string)=>{
    setRoles(roles.filter(role=>role!==rolee));
  }

  const createPost = (e : React.FormEvent)=>{
    e.preventDefault();
    const joinData : CreatePostDTO = {
        title : restData.title,
        content : restData.description,
        role : roles.join(", "),
        type : type
    }
    cPost.mutate(joinData);
  }

  return(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[600px] max-h-[90vh] overflow-y-auto relative">
        <button onClick={close} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X className="h-5 w-5"/>
        </button>
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <form className="space-y-4" onSubmit={createPost}>
          <div>
            <label className="block text-sm font-medium mb-1">Post Title</label>
            <input type="text" name="title" placeholder="Enter post title" className="border rounded-md w-full p-2"
            value={restData.title}
            onChange={(e)=>{
                setRestData({...restData, title: e.target.value})
            }}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Post Type</label>
              <select 
                value={type}
                onChange={e=>setType(e.target.value)}
                className="border rounded-md w-full p-2"
              >
                <option value="">Select</option>
                <option value="project">Project</option>
                <option value="competition">Competition</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="border rounded-md p-2 flex flex-wrap gap-2 min-h-[42px]">
                {roles.map((r)=>(
                  <span key={r} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                    {r}
                    <button type="button" onClick={()=>deleteRole(r)} className="text-gray-500 hover:text-black">x</button>
                  </span>
                ))}
                <input 
                  type="text"
                  name="role"
                  placeholder="Roles"
                  className="flex-1 outline-none"
                  value={roleInput}
                  onChange={e=>setRoleInput(e.target.value)}
                  onKeyDown={addRole}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="content"
              placeholder="Write your description here"
              className="border rounded-md w-full p-2 min-h-[150px]"
              value={restData.description}
              onChange={(e)=>{
                setRestData({...restData, description : e.target.value})
              }}
            />
          </div>
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={close} className="border rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100">
                Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
                Publish
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost;
