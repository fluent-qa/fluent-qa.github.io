import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Slide} from "@/types";
import Link from "next/link";

interface SlideCardProps {
    slide: Slide,
    key?: string
}

export function SlideCard({slide, key}: SlideCardProps) {
    return (
        <Link href={`/slide/${slide.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle>{slide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">{slide.description}</p>
                    
                    <p className="text-sm text-gray-500">Categories: </p>
                    {slide.categories.map((category) => (
                        <label key={category} className="text-md text-blue-500 mt-2 inline-flex items-center p-2">
                           {category}
                        </label>
                    ))}

                    <p className="text-sm text-gray-400">Create Date: {new Date(slide.date).toLocaleDateString()}</p>
                </CardContent>
            </Card>
        </Link>
    );
}