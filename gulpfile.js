import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { pug } from './gulp/tasks/pug.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otf2ttf, ttf2woff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprite } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';



function watcher() {
    gulp.watch(path.watch.files, gulp.series(reset, copy));
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.pug, pug);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}



// const fonts = gulp.series(otf2ttf, ttf2woff, fontsStyle);
// const mainTask = gulp.series(fonts, gulp.parallel(copy, html, pug, scss, js, images));
const mainTask = gulp.series(gulp.parallel(copy, html, pug, scss, js, images));

const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZip = gulp.series(reset, mainTask,zip);
const deployFTP = gulp.series(reset, mainTask,ftp);

export { svgSprite }
export { dev }
export { build }
export { deployZip }
export { deployFTP }

gulp.task('default', dev);