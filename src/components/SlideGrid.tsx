import { Slide } from "@/types";
import { SlideCard } from "./SlideCard";

interface SlideGridProps {
  slides: Slide[];
}

export function SlideGrid({ slides }: SlideGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {slides.map((slide) => (
        <SlideCard key={slide.id} slide={slide} />
      ))}
    </div>
  );
}