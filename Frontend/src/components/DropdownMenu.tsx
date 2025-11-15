"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecruitMenuProps {
  postId: number;
  interestedUsers: { username: string; Profile: boolean }[];
}

export function RecruitDropdownMenu({
  postId,
  interestedUsers,
}: RecruitMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Requests ({interestedUsers.length})</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 z-50" align="end">
        <DropdownMenuLabel>Who Interested</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {interestedUsers.map((user, idx) => (
          <div key={idx}>
            <DropdownMenuItem>
              {user.Profile ? user.username[0].toUpperCase() : user.username[0]}
            </DropdownMenuItem>
            <DropdownMenuItem>{user.username}</DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
