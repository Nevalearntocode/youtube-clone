import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center gap-1">
      <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      <p className="font-semibold text-xl tracking-tight">NewTube</p>
    </div>
  );
}
