import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';


export const otf2ttf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({ title: "FONTS", message: 'Error: <%= error.message %>' })
        ))
        .pipe(fonter({ formats: ['ttf'] }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttf2woff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({ title: "FONTS", message: 'Error: <%= error.message %>' })
        ))
        .pipe(fonter({ formats: ['woff'] }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));

}


function cb() { }

export function fontsStyle(params) {

    // let file_content = fs.readFile(app.path.srcFolder + '/scss/fonts.scss');
    // if (file_content == '') {
    //     fs.writeFile(app.path.srcFolder + '/scss/fonts.scss', '', cb);
    //     return fs.readdir(path.build.fonts, function (err, items) {
    //         if (items) {
    //             let c_fontname;
    //             for (var i = 0; i < items.length; i++) {
    //                 let fontname = items[i].split('.');
    //                 fontname = fontname[0];
    //                 if (c_fontname != fontname) {
    //                     fs.appendFile(app.path.srcFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
    //                 }
    //                 c_fontname = fontname;
    //             }
    //         }
    //     })
    // }else{
    //     console.log("файл scss/fonts.scss уже существует");
    // }
    return null
}
