import { Post } from "@/types";
import {
  Medal,
  ThumbsUp,
  Bookmark,
  CheckCircle2,
  MessageSquareText,
  Share2,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { addInterest } from "@/api/Interest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export const PostCard = ({
  post,
  userId,
}: {
  post: Post;
  userId: number | null;
}) => {
  const [hasInterested, setHasInterested] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sendInterest = useMutation({
    mutationFn: addInterest,
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Interest Sent",
        description: "The author can now see your interest",
      });
      setHasInterested(true);
    },
    onError: (err) => {
      toast({
        title: "Failed to send interest",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handlePostClick = () => {
    navigate(`post/${post.id}`, { state: { background: location } });
  };

  const handleInterest = (e: React.MouseEvent) => {
    e.stopPropagation();
    sendInterest.mutate({ userId, postId: post.id });
  };

  const isSending = sendInterest.isPending;

  return (
    <div
      onClick={handlePostClick}
      className="group relative bg-[#161616] border border-white/5 rounded-[24px] p-6
                 hover:border-white/20 hover:bg-[#1c1c1c] transition-all duration-300 cursor-pointer
                 shadow-xl hover:shadow-2xl overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col gap-5">
        {/* Header: Type & Title */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 w-fit bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <Medal size={14} className="text-[#A1A1AA]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA]">
                {post.type}
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              {post.title}
            </h3>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); /* share logic */
            }}
            className="p-2 text-[#71717A] hover:text-white transition-colors"
          >
            <Share2 size={18} />
          </button>
        </div>
        <p className="text-[#A1A1AA] text-sm leading-relaxed font-light line-clamp-3">
          {post.content}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.role?.split(",").map(
            (role, idx) =>
              role.trim() && (
                <span
                  key={idx}
                  className="px-3 py-1 text-[11px] font-medium bg-[#0A0A0A] border border-white/5 text-[#71717A] rounded-lg group-hover:border-white/10 group-hover:text-white transition-all"
                >
                  {role.trim()}
                </span>
              ),
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#222] to-[#0A0A0A] border border-white/10 flex items-center justify-center font-bold text-sm">
              {post.PostOwner?.username?.[0].toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {post.PostOwner?.username || "Anonymous"}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-[#71717A]">
                <Calendar size={10} />
                {new Date(post.createdat).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-4">
            <div className="flex items-center gap-3 text-[#71717A]">
              <ActionIcon icon={<ThumbsUp size={18} />} count={0} />
              <ActionIcon icon={<MessageSquareText size={18} />} count={0} />
              <ActionIcon icon={<Bookmark size={18} />} />
            </div>
            {hasInterested ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20">
                <CheckCircle2 size={14} />
                <span>Requested</span>
              </div>
            ) : (
              <button
                onClick={handleInterest}
                disabled={isSending}
                className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-[#E5E7EB] transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-white/5"
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
    </div>
  );
};

const ActionIcon = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count?: number;
}) => (
  <button
    onClick={(e) => e.stopPropagation()}
    className="flex items-center gap-1.5 hover:text-white transition-colors"
  >
    {icon}
    {count !== undefined && (
      <span className="text-xs font-medium">{count}</span>
    )}
  </button>
);
