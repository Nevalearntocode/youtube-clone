"use client";

import FilterCarousel from "@/components/filter-carousel";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  categorySlug?: string;
};

const CategoriesSectionSuspense = ({ categorySlug }: Props) => {
  const [categories] = trpc.categories.list.useSuspenseQuery();
  const router = useRouter();

  const onSelect = (slug: string | null) => {
    const url = new URL(window.location.href);

    if (slug) {
      url.searchParams.set("category", slug);
    } else {
      url.searchParams.delete("category");
    }
    router.push(url.toString());
  };

  return (
    <FilterCarousel
      data={[...categories]}
      onSelect={onSelect}
      value={categorySlug}
    />
  );
};

const CategoriesSkeleton = () => {
  return (
    <FilterCarousel isLoading value={null} data={[]} onSelect={() => {}} />
  );
};

const CategoriesSection = ({ categorySlug }: Props) => {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <CategoriesSectionSuspense categorySlug={categorySlug} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default CategoriesSection;
