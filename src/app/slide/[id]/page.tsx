import { getSlideById } from "@/lib/slides-util";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SlidePage({ params }: { params: { id: string } }) {
    const slide = getSlideById(params.id);

    if (!slide) {
        return <div>Slide not found</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <Link href="/">
                <Button variant="outline" className="mb-4">Back to Home</Button>
            </Link>
            <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
            <p className="mb-4">{slide.description}</p>
            <iframe
                src={`/slides/${slide.id}/index.html`}
                className="w-full h-[calc(100vh-200px)] border-spacing-10 border-2"
                title={slide.title}
            />
        </div>
    );
}