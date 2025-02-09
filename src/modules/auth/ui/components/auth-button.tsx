"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
        {/* Add menu items  */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={"outline"}
            className="rounded-full border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
