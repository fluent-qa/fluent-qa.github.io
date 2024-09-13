import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {Slide} from '@/types';

const slidesDirectory = path.join(process.cwd(), 'slides');

export function getAllSlides(): Slide[] {
    const fileNames = fs.readdirSync(slidesDirectory);
    return fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(slidesDirectory, fileName,"index.md");
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const {data} = matter(fileContents);

        return {
            id,
            title: data.title,
            description: data.description,
            categories: data.categories,
            date: data.date,
            slidePath: `/slides/${id}/index.html`,
        };
    });
}

export function getSlideCategories(): string[] {
    const slides = getAllSlides();
    return Array.from(new Set(slides.flatMap(slide => slide.categories || [])));
}

export function getSlidesByCategory(category: string): Slide[] {
    const slides = getAllSlides();
    return slides.filter((slide) => category in slide.categories);
}

export function getSlideById(id: string): Slide | undefined {
    const slides = getAllSlides();
    return slides.find((slide) => slide.id === id);
}