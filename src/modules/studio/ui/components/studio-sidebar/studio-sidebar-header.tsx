"use client";

import React from "react";
import {
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import UserAvatar from "@/components/user-avatar";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const StudioSidebarHeader = (props: Props) => {
  const { user } = useUser();
  const { state } = useSidebar();

  if (!user) {
    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <Skeleton className="size-[112px] rounded-full" />
        <div className="mt-2 flex flex-col items-center gap-y-1">
          <Skeleton className="h-4 w-[80px] rounded" />
          <Skeleton className="h-4 w-[100px] rounded" />
        </div>
      </SidebarHeader>
    );
  }

  if (state === "collapsed") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={`Your profile`}>
          <Link href={`/users/current`}>
            <UserAvatar
              image={user.imageUrl}
              name={user.fullName ?? "User"}
              size={`xs`}
              className="transition-opacity hover:opacity-80"
            />
            <span className="text-sm">Your profile</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href={`/users/current`}>
        <UserAvatar
          image={user.imageUrl}
          name={user.fullName ?? "User"}
          className="size-[112px] transition-opacity hover:opacity-80"
        />
      </Link>
      <div className="mt-2 flex flex-col items-center gap-y-1">
        <p className="text-sm font-medium">Your profile</p>
        <p className="text-xs text-muted-foreground">{user.fullName}</p>
      </div>
    </SidebarHeader>
  );
};

export default StudioSidebarHeader;
