import { Post } from "@/types";
import { PostCard } from "./PostCard";

export const RenderPosts = ({
  posts,
  userId,
}: {
  posts: Post[];
  userId: number | null;
}) => {
  if (posts.length === 0) {
    return <p className="text-center text-muted-foreground">No posts found</p>;
  }
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
};
