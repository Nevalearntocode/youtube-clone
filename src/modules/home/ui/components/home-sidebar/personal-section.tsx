"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "History",
    url: "/playlists/history",
    Icon: HistoryIcon,
  },
  {
    title: "Liked videos",
    url: "/playlists/liked",
    Icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "Playlists",
    url: "/playlists",
    Icon: ListVideoIcon,
  },
];
export const PersonalSection = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false}
                onClick={() => {
                  if (!isSignedIn && item.auth) {
                    return clerk.openSignIn();
                  }
                }}
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.Icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
