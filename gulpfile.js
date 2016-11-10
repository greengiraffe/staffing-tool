let gulp = require('gulp');

let appDev = 'assets/app/';
let appProd = 'public/js/app/';
let vendor = 'public/js/vendor';
let backend = 'server/';

/* JS & TS */
let typescript = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let eslint = require('gulp-eslint');
let tslint = require('gulp-tslint');

let tsProject = typescript.createProject('tsconfig.json');



gulp.task('tslint', () =>
    gulp.src('assets/app/**/*.ts')
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report())
);

// Transpile Typescript
gulp.task('build-ts', () => {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appProd));
});

// JS linting
gulp.task('eslint', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!public/js/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('build-copy', () => {
    return gulp.src([appDev + '**/*.html', appDev + '**/*.htm', appDev + '**/*.css'])
        .pipe(gulp.dest(appProd));
});


gulp.task('vendor', () => {

    // Angular 2 Framework
    gulp.src('node_modules/@angular/**')
        .pipe(gulp.dest(vendor + '/@angular'));

    // ES6 Shim
    gulp.src('node_modules/es6-shim/**')
        .pipe(gulp.dest(vendor + '/es6-shim/'));

    // reflect metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(vendor + '/reflect-metadata/'));

    // rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(vendor + '/rxjs/'));

    // systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(vendor + '/systemjs/'));

    // zonejs
    return gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(vendor + '/zone.js/'));
});

gulp.task('watch', () => {
    gulp.watch(appDev + '**/*.ts', ['build-ts', 'tslint']);
    gulp.watch(appDev + '**/*.{html,htm,css}', ['build-copy']);
    gulp.watch(backend + '**/*.js', ['eslint']);
});

gulp.task('default', ['watch', 'build-ts', 'build-copy']);
