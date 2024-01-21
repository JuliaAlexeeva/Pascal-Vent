export const phpmailer = () => {
    // файл получен и теперь необходимо действие
    return app.gulp.src(app.path.src.phpmailer) // получили файлы
        // дейсвтие:
        .pipe(app.gulp.dest(app.path.build.phpmailer)) // перенесли файлы
}