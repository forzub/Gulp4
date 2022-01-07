import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = './build';
const srcFolder = './src';

export const path = {
    build: {
        html: `${buildFolder}/`,
        fonts: `${buildFolder}/fonts`,
        images: `${buildFolder}/img`,
        js: `${buildFolder}/js`,
        css: `${buildFolder}/css`,
        files: `${buildFolder}/files/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/style.scss`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        svgicon: `${srcFolder}/svgicon/*.svg`,
        html: `${srcFolder}/html/*.html`,
        pug: `${srcFolder}/pug/*.pug`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,svg,ico,webp}`,
        html: `${srcFolder}/html/**/*.html`,
        pug: `${srcFolder}/pug/**/*.pug`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean : buildFolder,
    buildFolder : buildFolder,
    srcFolder : srcFolder,
    rootFolder : rootFolder,
    ftp: '',
}