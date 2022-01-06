import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';


function watcher() {
    gulp.watch(path.watch.files, gulp.series(reset, copy));
    gulp.watch(path.watch.html, html);
}


const copyTask = gulp.parallel(copy, html);

const filesCopy = gulp.series(reset, copyTask, watcher);
gulp.task('default', filesCopy);