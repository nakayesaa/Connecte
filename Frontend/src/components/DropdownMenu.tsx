"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserDatafromPost } from "@/api/Interest";

interface RecruitMenuProps {
  postId: string;
}

interface InterestedUser {
  username: string;
}

export function RecruitDropdownMenu({ postId }: RecruitMenuProps) {
  const [interestedUsers, setInterestedUsers] = useState<InterestedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchUsers = async () => {
    if (loaded) return;
    setLoading(true);
    try {
      const res = await getUserDatafromPost(postId);
      if (res.success) {
        const users = res.data.map((item: any) => ({
          username: item.user.username,
        }));
        setInterestedUsers(users);
      }
    } catch (err) {
      console.error("Failed to fetch interested users", err);
    } finally {
      setLoading(false);
      setLoaded(true);
      console.log(`Finished fetching for post ${postId}`);
    }
  };

  return (
    <DropdownMenu onOpenChange={(isOpen) => isOpen && fetchUsers()}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {loading ? "Loading..." : `Requests (${interestedUsers.length})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50" align="end">
        <DropdownMenuLabel>Who Interested</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        ) : interestedUsers.length === 0 ? (
          <DropdownMenuItem>No requests yet</DropdownMenuItem>
        ) : (
          interestedUsers.map((user, idx) => (
            <DropdownMenuItem key={idx}>
              {user.username[0].toUpperCase()} - {user.username}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
