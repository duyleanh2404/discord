'use client';

import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';

import { MemberRole } from '@prisma/client';

import { useModal } from '@/hooks/use-modal-store';
import { ServerWithMembersWithProfiles } from '@/types';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dar:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('invite', { server })}
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            >
              Invite people
              <UserPlus className="h-4 w-4 ml-auto text-indigo-600 dark:text-indigo-400" />
            </DropdownMenuItem>
            <DropdownMenuItem className="group px-3 py-2 text-sm cursor-pointer">
              Create channel
              <PlusCircle className="h-4 w-4 ml-auto group-hover:text-white" />
            </DropdownMenuItem>
          </>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('editServer', { server })}
              className="group px-3 py-2 text-sm cursor-pointer"
            >
              Server settings
              <Settings className="h-4 w-4 ml-auto group-hover:text-white" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('members', { server })}
              className="group px-3 py-2 text-sm cursor-pointer"
            >
              Manage members
              <Users className="h-4 w-4 ml-auto group-hover:text-white" />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin ? (
          <DropdownMenuItem variant="destructive" className="px-3 py-2 text-sm cursor-pointer">
            Delete server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem variant="destructive" className="px-3 py-2 text-sm cursor-pointer">
            Leave server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
