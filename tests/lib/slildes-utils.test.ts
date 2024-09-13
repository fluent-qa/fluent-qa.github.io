import {describe, it, expect} from 'vitest';
import {getAllSlides, getSlideById, getSlideCategories} from "@/lib/slides-util";



describe('getAllSlidesTest', () => {
    it('should return an array of slides', () => {
        const slides = getAllSlides();
        console.log(slides)
        expect(slides.length).greaterThan(0);
        // expect(slides).toBeInstanceOf(Array);
        // expect(slides.length).toBeGreaterThan(0);
        // slides.forEach(slide => {
        //     expect(slide).toHaveProperty('id');
        //     expect(slide).toHaveProperty('title');
        //     expect(slide).toHaveProperty('description');
        //     expect(slide).toHaveProperty('category');
        //     expect(slide).toHaveProperty('date');
        //     expect(slide).toHaveProperty('slidePath');
        // });
    });
    it("should get all categories", () => {
        const categories = getSlideCategories();
        console.log(categories)
        expect(categories.length).greaterThan(0);
    })
    it("should get slide by id", () => {
        const slide = getSlideById("python-poetry");
        console.log(slide)
    })
});
