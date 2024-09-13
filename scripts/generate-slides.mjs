// scripts/generate-slides.mjs

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const slidesDir = path.join(__dirname, '..', 'slides');
const publicOutputDir = path.join(__dirname, '..', '.site', 'slides');
const publicAssetOutDir = path.join(__dirname, '..', '.site', 'assets');
const publicImgOutDir = path.join(__dirname, '..', '.site', 'images');
const siteFolder = path.join(__dirname, '..', '.site');
const publicFolder = path.join(__dirname, '..', 'public');

fs.ensureDirSync(publicOutputDir);

function updateAssetPaths(htmlContent, slideId) {
    const replacements = [
        { from: /src="\/assets\//g, to: `src="/slides/${slideId}/assets/` },
        { from: /href="\/assets\//g, to: `href="/slides/${slideId}/assets/` },
        { from: /from"\/assets\//g, to: `from"/slides/${slideId}/assets/` },
        { from: /url\(\/assets\//g, to: `url(/slides/${slideId}/assets/` },
        { from: /src="\/images\//g, to: `src="/slides/${slideId}/images/` },
        // Add more specific replacements for slidev assets
        { from: /src="\/slidev\//g, to: `src="/slides/${slideId}/slidev/` },
        { from: /href="\/slidev\//g, to: `href="/slides/${slideId}/slidev/` },
        // Handle absolute paths without leading slash
        { from: /src="assets\//g, to: `src="slides/${slideId}/assets/` },
        { from: /href="assets\//g, to: `href="slides/${slideId}/assets/` },
        { from: /src="slidev\//g, to: `src="slides/${slideId}/slidev/` },
        { from: /href="slidev\//g, to: `href="slides/${slideId}/slidev/` },
    ];

    let updatedContent = htmlContent;
    replacements.forEach(({ from, to }) => {
        updatedContent = updatedContent.replace(from, to);
    });

    return updatedContent;
}

function updateHtmlFile(filePath, slideId) {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const updatedHtmlContent = updateAssetPaths(htmlContent, slideId);
    fs.writeFileSync(filePath, updatedHtmlContent);
    console.log(`Updated asset paths in ${path.basename(filePath)} for ${slideId}`);
}

fs.readdirSync(slidesDir).forEach((folder) => {
    const folderPath = path.join(slidesDir, folder);
    const stats = fs.statSync(folderPath);

    if (stats.isDirectory()) {
        const indexMdPath = path.join(folderPath, 'index.md');
        if (fs.existsSync(indexMdPath)) {
            const outputPath = path.join(publicOutputDir, folder);

            console.log(`Generating slides for ${folder}...`);
            execSync(`npx slidev build ${indexMdPath} --out ${outputPath}`, { stdio: 'inherit' });

            // Update asset paths in all HTML files
            fs.readdirSync(outputPath).forEach((file) => {
                if (file.endsWith('.html')) {
                    const htmlFilePath = path.join(outputPath, file);
                    updateHtmlFile(htmlFilePath, folder);
                }
            });

            // Log all asset references for debugging
            console.log(`Logging asset references for ${folder}...`);
            const indexHtmlPath = path.join(outputPath, 'index.html');
            const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
            const assetRefs = indexHtmlContent.match(/(src|href)="[^"]*"/g);
            console.log(assetRefs);
            console.log("copy assets to public directory assets folder");
            fs.copySync(path.join(outputPath,'assets'), publicAssetOutDir, { overwrite: true });
            fs.copySync(path.join(outputPath,'images'), publicImgOutDir, { overwrite: true });
            fs.copySync(path.join(outputPath,'images'), publicImgOutDir, { overwrite: true });
            fs.copySync(path.join(siteFolder), publicFolder, { overwrite: true });
        }
    }
});

// console.log('Slides generation and asset path updates complete!');
// import { execSync } from 'child_process';
// import fs from 'fs-extra';
// import path from 'path';
// import { fileURLToPath } from 'url';
//
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
//
// const slidesDir = path.join(__dirname, '..', 'slides');
// const publicOutputDir = path.join(__dirname, '..', 'public', 'slides');
//
// // Ensure output directory exists
// fs.ensureDirSync(publicOutputDir);
//
// fs.readdirSync(slidesDir).forEach((folder) => {
//     const folderPath = path.join(slidesDir, folder);
//     const stats = fs.statSync(folderPath);
//
//     if (stats.isDirectory()) {
//         const indexMdPath = path.join(folderPath, 'index.md');
//         if (fs.existsSync(indexMdPath)) {
//             const outputPath = path.join(publicOutputDir, folder);
//
//             console.log(`Generating slides for ${folder}...`);
//             try {
//                 execSync(`npx slidev build ${indexMdPath} --out ${outputPath}`, { stdio: 'inherit' });
//                 console.log(`Successfully generated slides for ${folder}`);
//             } catch (error) {
//                 console.error(`Error generating slides for ${folder}:`, error);
//             }
//         } else {
//             console.warn(`No index.md found in ${folder}, skipping...`);
//         }
//     }
// });
//
// console.log('Slides generation complete!');
// console.log(`Slides are available in ${publicOutputDir}`);