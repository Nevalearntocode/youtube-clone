import React from "react";

type Props = {
  params: Promise<{ videoId: string }>;
};

const Page = async ({ params }: Props) => {
  const { videoId } = await params;

  return <div>{videoId}</div>;
};

export default Page;
