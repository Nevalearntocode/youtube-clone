"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

type Props = {};

const StudioUploadModal = (props: Props) => {
  return (
    <Button variant={`secondary`}>
      <PlusIcon />
      Create
    </Button>
  );
};

export default StudioUploadModal;
