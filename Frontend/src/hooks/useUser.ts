import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getUsername,
  userLogout,
  getAllUserData,
  updateUserData,
} from "@/api/User";
import { Toast } from "@/components/ui/toast";
import { toast } from "./use-toast";

export const useGetUsername = () => {
  return useQuery({
    queryKey: ["userUsername"],
    queryFn: getUsername,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export const UsegetAllUserData = () => {
  return useQuery({
    queryKey: ["AllUserData"],
    queryFn: getAllUserData,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserData,
    onSuccess: (data) => {
      queryClient.setQueryData(["userData"], data);
    },
  });
};
