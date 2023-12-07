const { series, parallel, src, dest, task, watch } = require('gulp');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const cleanCSS = require('gulp-clean-css');

task('env-dev', () => {
    return src('src/environment/env.dev.js')
        .pipe(concat('env.js'))
        .pipe(dest('src/env/'));
});

task('app.css', () => {
    return src(['src/**/*.css', 'assets/css/**/*.css'])
        .pipe(cleanCSS())
        .pipe(concat('app.min.css'))
        .pipe(dest('dist/assets/css'));
});

task('app.js', () => {
    return src([
        'src/app.module.js',
        'src/env/**/*.js',
        'src/config/**/*.js',
        'src/common/**/*.js',
        'src/components/**/*.js',
    ])
        .pipe(babel({ presets: ['env'] }))
        .pipe(concat('app.min.js'))
        .pipe(dest('dist/assets/js'));
});

task('app.assets', () => {
    return src('assets/**/*.*').pipe(dest('dist/assets'));
});

// task('img', () => {
//     return src('src/assets/img/**/*')
//         .pipe(imagemin([
//             imagemin.gifsicle({ interlaced: true }),
//             imagemin.jpegtran({ progressive: true }),
//             imagemin.optipng({ optimizationLevel: 5 }),
//             imagemin.svgo({
//                 plugins: [
//                     { removeViewBox: true },
//                     { cleanupIDs: false }
//                 ]
//             })
//         ]))
//         .pipe(dest('dist/assets/img'));
// });

task('deps', () => {
    return src([
        'node_modules/angular/angular.min.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/jquery/dist/jquery.min.js',
    ], { allowEmpty: true })
        .pipe(concat('deps.min.js'))
        .pipe(dest('dist/assets/js'));
});

task('app.html', () => {
    return src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
});

task('watch', () => {
    watch('src/**/*.html', series('app.html'));
    watch('src/**/*.css', series('app.css'));
    watch('src/**/*.js', series('app.js'));
});

task('serverStart', () => {
    return src('dist')  // Servir a pasta 'dist'
        .pipe(webserver({
            host: 'localhost',
            livereload: true,
            port: process.env.PORT || 3000,
            open: false,
            middleware: [
                history(),
                serveStatic('dist'),  // Adicione o middleware para servir os arquivos estáticos
            ],
        }));
});

task('clean', () => {
    return del(['dist/**/*']);
})

exports.default = series('clean', 'deps', 'env-dev', 
                parallel('app.html', 'app.css', 'app.js', 'app.assets',), 
                'serverStart', 'watch');
