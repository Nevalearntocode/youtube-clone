import React from "react";
import CategoriesSection from "../sections/categories-section";

type Props = {
  categorySlug?: string;
};

const HomeView = ({ categorySlug }: Props) => {
  return (
    <div className="mx-auto mb-4 flex max-w-[2400px] flex-col gap-y-6 px-4 pt-2.5">
      <CategoriesSection categorySlug={categorySlug} />
    </div>
  );
};
export default HomeView;
