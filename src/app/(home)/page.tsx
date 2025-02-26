import { HydrateClient, trpc } from "@/trpc/server";
import HomeView from "@/modules/home/ui/views/home-view";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

const Page = async ({ searchParams }: Props) => {
  void trpc.categories.list.prefetch();

  const { category } = await searchParams;

  return (
    <HydrateClient>
      <HomeView categorySlug={category} />
    </HydrateClient>
  );
};

export default Page;
