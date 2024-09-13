import { SlideGrid } from "@/components/SlideGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { getSlidesByCategory, getSlideCategories } from "@/lib/slides-util";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const slides = getSlidesByCategory(params.category);
  const categories = getSlideCategories();
  console.log(slides)
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Slides: {params.category}</h1>
      <CategoryFilter categories={categories} activeCategory={params.category} />
      <SlideGrid slides={slides} />
    </main>
  );
}