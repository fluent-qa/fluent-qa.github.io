import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  console.log(categories,activeCategory)
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link href="/">
        <Button variant={!activeCategory ? "secondary" as const : "outline" as const}>All</Button>
      </Link>
      {categories.map((category) => (
        <Link key={category} href={`/${category}`}>
          <Button
            variant={activeCategory === category ? "secondary" as const : "outline" as const}
          >
            {category}
          </Button>
        </Link>
      ))}
    </div>
  );
}