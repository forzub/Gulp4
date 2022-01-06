import * as nodePath from 'path';
const rootFoler = nodePath.basename(nodePath.resolve());

const buildFolder = './build';
const srcFolder = './src';

export const path = {
    build: {
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`,
    },
    src: {
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean : buildFolder,
    buildFolder : buildFolder,
    srcFolder : srcFolder,
    rootFoler : rootFoler,
    ftp: '',
}