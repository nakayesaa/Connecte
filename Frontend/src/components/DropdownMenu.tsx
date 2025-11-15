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
  interestedUsers: { username: string }[];
}

export function RecruitDropdownMenu({
  postId,
  interestedUsers,
}: RecruitMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Recruit ({interestedUsers.length})</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Who Interested</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {interestedUsers.length === 0 ? (
          <DropdownMenuItem disabled>
            No one showing interest right now
          </DropdownMenuItem>
        ) : (
          interestedUsers.map((user, idx) => (
            <DropdownMenuItem key={idx}>{user.username}</DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
