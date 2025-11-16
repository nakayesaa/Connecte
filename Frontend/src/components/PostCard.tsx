import { Post } from "@/types";
import {
  Medal,
  ThumbsUp,
  Bookmark,
  CheckCircle2,
  MessageSquareText,
} from "lucide-react";
import { useState } from "react";
import { addInterest } from "@/api/Interest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";

export const PostCard = ({
  post,
  userId,
}: {
  post: Post;
  userId: number | null;
}) => {
  const [hover, setHover] = useState<string | null>(null);
  const [hasInterested, setHasInterested] = useState(false);

  const sendInterest = useMutation({
    mutationFn: addInterest,
    onSuccess: (data) => {
      console.log("Done Creating New User", data);
      toast({
        title: "Interest Sent",
        description: "The author can now see your interest!",
        variant: "default",
      });
      setHasInterested(true);
    },
    onError: (data) => {
      console.log(data);
      toast({
        title: "Failed to send interest",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleInterest = async () => {
    sendInterest.mutate({
      userId: userId,
      postId: post.id,
    });
  };

  const isSending = sendInterest.isPending;
  return (
    <div
      key={post.id}
      onMouseEnter={() => setHover(post.id)}
      onMouseLeave={() => setHover(null)}
      className="border-4 border-slate-900 rounded-xl bg-white
                 shadow-[8px_8px_0_0_#1e293b]
                 hover:shadow-[12px_12px_0_0_#1e293b]
                 transition-all duration-100 p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex flex-row items-center space-x-3">
            <div className="inline-flex items-center space-x-1 border border-blue-900 bg-blue-50/50 rounded-full py-1 px-6">
              <Medal className="text-blue-900" />
              <div className="text-sm text-blue-900 font-bold">{post.type}</div>
            </div>
            <div className="text-2xl font-bold ml-auto mr-auto">
              {post.title}
            </div>
            <div></div>
          </div>

          <div className="text-gray-600 mt-2 whitespace-pre-line">
            {post.content}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {post.role &&
              post.role
                .split(",")
                .filter((role) => role.trim() !== "")
                .map((role, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full bg-slate-300"
                  >
                    {role.trim()}
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
            {post.PostOwner?.username
              ? post.PostOwner.username.charAt(0).toUpperCase()
              : "X"}
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
            <ThumbsUp className="text-sm" />
          </button>
          <button>
            <MessageSquareText />
          </button>
          <button>
            <Bookmark />
          </button>
          {hasInterested ? (
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle2 className="h-5 w-5" />
              <span>Interested Sent</span>
            </div>
          ) : (
            <button
              onClick={handleInterest}
              className="px-4 py-2 bg-slate-700 text-white text-md rounded-lg hover:bg-slate-950 flex items-center justify-center"
              disabled={isSending}
            >
              {isSending ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Send Request"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
