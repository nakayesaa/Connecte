import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPost } from "@/api/Post";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["Posts"],
    queryFn: getPost,
  });
};
