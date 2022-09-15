import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber())
    .pipe(fonter({ formats: ['ttf'] }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
}

export const ttfToWoff = () => {
  let isExist;
  if (fs.existsSync(`${app.path.srcFolder}/fontsWoff`)) {
    console.log('Папка есть. для обновления шрифтов - удалите папку');
    isExist = true;
  }
  else {
    console.log('Папки woff шрифтов нет');
    isExist = false;
  }

  console.log(isExist);
  return app.gulp.src(`${app.path.srcFolder}/fontsWoff/*.*`, {})
    .pipe(app.plugins.if(isExist, app.gulp.dest(app.path.build.fonts)))

    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
    .pipe(app.plugins.if(!isExist, fonter({ formats: ['woff'] })))
    .pipe(app.plugins.if(!isExist, app.gulp.dest(app.path.build.fonts)))
    .pipe(app.plugins.if(!isExist, app.gulp.dest(`${app.path.srcFolder}/fontsWoff`)))

    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
    .pipe(app.plugins.if(!isExist, ttf2woff2()))
    .pipe(app.plugins.if(!isExist, app.gulp.dest(`${app.path.srcFolder}/fontsWoff`)))
    .pipe(app.plugins.if(!isExist, app.gulp.dest(app.path.build.fonts)));
}


export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];

          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            fontWeight = fontWeight.toLowerCase();

            switch (fontWeight) {
              case 'thin': fontWeight = 100; break;
              case 'extralight': fontWeight = 200; break;
              case 'light': fontWeight = 300; break;
              case 'medium': fontWeight = 500; break;
              case 'semibold': fontWeight = 600; break;
              case 'bold': fontWeight = 700; break;
              case 'extrabold': fontWeight = 800; break;
              case 'black': fontWeight = 900; break;
              default: fontWeight = 400; break;
            }

            fs.appendFile(fontsFile,
              `@font-face{
                font-family:"${fontName}";
                font-display:swap;
                src:url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                font-weight:${fontWeight};
                font-style:normal;
              }\r\n`, cb);

            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log("Файл scss/fonts.scss уже существует. Для обновления файл следует удалить");
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);

  function cb() { }
}