import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-[160px] w-[160px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props extends VariantProps<typeof avatarVariants> {
  image: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

const UserAvatar = ({ image, className, onClick, size }: Props) => {
  return (
    <Avatar
      className={cn(avatarVariants({ className, size }))}
      onClick={onClick}
    >
      <AvatarImage src={image} />
    </Avatar>
  );
};

export default UserAvatar;
