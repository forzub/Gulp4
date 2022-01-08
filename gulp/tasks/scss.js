import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

import map from 'gulp-sourcemaps';
import bulk from 'gulp-sass-bulk-importer';
import concat from 'gulp-concat';



const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {})
        .pipe(map.init())

        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({ title: "SCSS", message: 'Error: <%= error.message %>' })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))


        .pipe(bulk())

        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: '.webp',
                    noWebClass: '.no-webp'
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserlist: ['last 3 versions'],
                    cascade: true
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        //.pipe(rename({ extname: '.min.css' }))

        .pipe(concat('style.min.css'))
        .pipe(map.write('../sourcemaps/'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}