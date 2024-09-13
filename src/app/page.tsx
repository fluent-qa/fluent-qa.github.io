import { SlideGrid } from "@/components/SlideGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { getAllSlides, getSlideCategories } from "@/lib/slides-util";

export default function Home() {
  const slides = getAllSlides();
  const categories = getSlideCategories();
  console.log(categories)
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Slides:</h1>
      <CategoryFilter categories={categories} activeCategory={'all'} />
      <SlideGrid slides={slides} />
    </main>
  );
}
