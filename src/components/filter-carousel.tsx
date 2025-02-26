import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type Props = {
  value?: string | null;
  isLoading?: boolean;
  onSelect: (value: string | null) => void;
  data: { slug: string; name: string }[];
};

const FilterCarousel = ({ value, isLoading, onSelect, data }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // if carousel API doesn't exist, return
    if (!api) return;

    // scrollSnapList returns the number of items in the carousel (number of CarouselItem in CarouselContent, this is provided by shadcn UI carousel API)
    setCount(api.scrollSnapList().length);
    // what is selectedScrollSnap? it's a function that returns the index of the currently selected item?
    // how does it know what is the currently selected item? it's based on the selected scroll snap index?
    // Do more reseach to understand this
    setCurrent(api.selectedScrollSnap() + 1);

    // Same for this one
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      {/* left fade */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-12 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent",
          current === 1 && "hidden",
        )}
      />
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full px-12"
        setApi={setApi}
      >
        {/* "-ml-3" is a trick from shadcn UI, this is a way you add certain paddings between items */}
        {/* also need basis-auto and pl-3 for each item for it to work with the shadcn UI carousel */}
        <CarouselContent className="-ml-3">
          {isLoading &&
            Array.from({ length: 17 }).map((_, index) => (
              <CarouselItem className="basis-auto pl-3" key={index}>
                <Skeleton className="h-full w-[100px] rounded-lg px-3 py-1 text-sm font-semibold">
                  &nbsp;
                </Skeleton>
              </CarouselItem>
            ))}
          {!isLoading && (
            <CarouselItem
              className="basis-auto pl-3"
              onClick={() => onSelect(null)}
            >
              <Badge
                variant={!value ? "default" : "secondary"}
                className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-sm"
              >
                All
              </Badge>
            </CarouselItem>
          )}
          {!isLoading &&
            data.map((item) => (
              <CarouselItem
                className="basis-auto pl-3"
                key={item.slug}
                onClick={() => onSelect(item.slug)}
              >
                <Badge
                  variant={value === item.slug ? "default" : "secondary"}
                  className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-sm"
                >
                  {item.name}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        {/* right fade */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 right-12 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent",
            current === count && "hidden",
          )}
        />
        <CarouselPrevious className="left-0 z-20" />
        <CarouselNext className="right-0 z-20" />
      </Carousel>
    </div>
  );
};

export default FilterCarousel;

// NOTE: to implement the fading effect, follow these steps:
//
// 1. declare current, count, and api states
// 2. use useEffect to set the api, count and current states
// 3. create the two fading divs, one for the left side and one for the right side
// 4. add the correct classes to the fading divs so that they are only visible
//    when the corresponding item is selected
// 5. use the api to get the selected index and update the current state
// 6. use the count state to determine the total number of items in the carousel
// 7. add the correct logic to the fading divs so that they are hidden when the
//    first or last item is selected
//
// example implementation:
//
// const [current, setCurrent] = useState(0);
// const [count, setCount] = useState(0);
// const [api, setApi] = useState<CarouselApi>();
//
// useEffect(() => {
//   if (!api) return;
//
//   setCount(api.scrollSnapList().length);
//   setCurrent(api.selectedScrollSnap() + 1);
//
//   api.on("select", () => {
//     setCurrent(api.selectedScrollSnap() + 1);
//   });
// }, [api]);
//
// <div
//   className={cn(
//     "pointer-events-none absolute bottom-0 left-12 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent",
//     current === 1 && "hidden",
//   )}
// />
// ...
// <div
//   className={cn(
//     "pointer-events-none absolute bottom-0 right-12 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent",
//     current === count && "hidden",
//   )}
// />
