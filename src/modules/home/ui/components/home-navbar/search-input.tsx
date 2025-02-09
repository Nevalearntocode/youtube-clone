import { SearchIcon } from "lucide-react";
import React from "react";

export const SearchInput = () => {
  // Todo: search functionality
  return (
    <form className="flex w-full max-w-[600px]">
      {/* Todo: add remove search button */}
      <div className="relative w-full">
        <input
          type="text"
          className="w-full rounded-l-full border py-2 pl-4 pr-12 focus:border-blue-500 focus:outline-none"
          placeholder="Search"
        />
      </div>
      <button
        type="submit"
        className="rounded-r-full border-l-0 bg-gray-100 px-5 py-2.5 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
