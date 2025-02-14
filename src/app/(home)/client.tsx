"use client";

import React from "react";
import { trpc } from "@/trpc/client";

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "world 2" });

  return <div>{data.greeting}</div>;
};
