
var gulp = require('gulp');
var clean = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');

gulp.task('build-npm', function() {
    runSequence('clean', 'copy-readme', 'copy-index.d.ts', 'tsx-to-es5', 'process-scss', function() {
        console.log("*** All Done.");
  });
});

gulp.task('build-sourcemap', function() {
    runSequence('clean2', 'copy-readme2', 'copy-index2.d.ts', 'tsx-to-es52', 'process-scss2', function() {
        console.log("*** All Done.");
  });
});

//--------------------------------------

gulp.task('clean', function() {
    console.log("*** Cleaning the 'lib' output folder (leave the package.json!)");
    return gulp.src(["lib_to_npm/*", "!lib_to_npm/package.json"], { read: false }).pipe(clean());
  });

gulp.task('copy-readme', function() {
    console.log("*** copy readme.md to lib folder");
    gulp.src('./README.md').pipe(gulp.dest('./lib_to_npm'));
})

gulp.task('copy-index.d.ts', function() {
    console.log("*** copy index.d.ts to lib folder");
    gulp.src('./src/index.d.ts').pipe(gulp.dest('./lib_to_npm'));
})

gulp.task('copy-demo', function() {
    console.log("*** copy files to lib folder");
    gulp.src(['./src/demo/demo.html']).pipe(gulp.dest('./lib_to_npm/demo'));
})

gulp.task('tsx-demo', function () {
    return gulp.src(['src/demo/*.ts*'])
        .pipe(ts({
            noImplicitAny: true,
            target: "es6",
            jsx: "react"
        }))
        .pipe(babel())
        .pipe(gulp.dest('lib_to_npm/demo'));
});

gulp.task('tsx-to-es5', function () {
    console.log("*** Processing tsx to es6 (typescript) to es5 (babel)");
    return gulp.src(['src/**/*.ts*', '!src/init.tsx'])
        .pipe(ts({
            noImplicitAny: true,
            module: "commonjs",
            target: "es6",
            jsx: "react"
        }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('lib_to_npm'));
});
  
gulp.task('process-scss', function() {
    console.log("*** Processing scss files");
    return gulp.src(["src/styles/flex.scss", "src/styles/rpopup.scss"])
        .pipe(sass()) 
        .pipe(gulp.dest('lib_to_npm/styles'));
});

//--------------------------------------

gulp.task('clean2', function() {
    console.log("*** Cleaning the 'lib' output folder (leave the package.json!)");
    return gulp.src(["lib_sourcemap/*", "!lib_sourcemap/package.json"], { read: false }).pipe(clean());
  });

gulp.task('copy-readme2', function() {
    console.log("*** copy readme.md to lib folder");
    gulp.src('./README.md').pipe(gulp.dest('./lib_sourcemap'));
})

gulp.task('copy-index2.d.ts', function() {
    console.log("*** copy index.d.ts to lib folder");
    gulp.src('./src/index.d.ts').pipe(gulp.dest('./lib_sourcemap'));
})

gulp.task('tsx-to-es52', function () {
    console.log("*** Processing tsx to es6 (typescript) to es5 (babel)");
    return gulp.src(['src/**/*.ts*', '!src/init.tsx'])
        .pipe(sourcemaps.init())    
        .pipe(ts({
            noImplicitAny: true,
            module: "commonjs",
            target: "es6",
            jsx: "react"
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('lib_sourcemap'));
});
  
gulp.task('process-scss2', function() {
    console.log("*** Processing scss files");
    return gulp.src("src/styles/rdropdown.scss")
        .pipe(sass()) 
        .pipe(gulp.dest('lib_sourcemap/styles'));
});




