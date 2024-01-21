export const phpfiles = () => {
    // файл получен и теперь необходимо действие
    return app.gulp.src(app.path.src.phpfiles) // получили файлы
        // дейсвтие:
        .pipe(app.gulp.dest(app.path.build.phpfiles)) // перенесли файлы
}