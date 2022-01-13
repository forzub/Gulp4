import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import pugf from 'gulp-pug';


export const pug = () => {
    return app.gulp.src(app.path.src.pug)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({ title: "PUG", message: 'Error: <%= error.message %>'})
        ))
        .pipe(pugf({
            pretty: true,   // сжатие html файла
            verbose: true   // консольложить файл
        })) 
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        //.pipe(webpHtmlNosvg())
        .pipe(versionNumber({
            'value': '%DT%',
            'append': {
                'key': 'v',
                'cover': 0,
                'to': ['css', 'js',]
            },
            'output': {
                'file': 'gulp/version.json'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}