const gulp = require('gulp');
const gulpsass = require('gulp-sass');
const gulpcopy = require('gulp-copy');
const browserSync = require('browser-sync');
//init libary
gulpsass.compiler = require ('node-sass');
//---config structure 
const APP_SRC_PATH = './src';
const APP_TMP_PATH = './tmp';
const APP_STRUCTURE = {
    tmp :{
        css     : APP_TMP_PATH + '/css',
        images    :  APP_TMP_PATH + '/images',
        fonts   : APP_TMP_PATH + '/fonts',
        js      : APP_TMP_PATH + '/js',
    },
    src: {
        scss    :  APP_SRC_PATH + '/scss',
        images    :  APP_SRC_PATH + '/images',
        fonts   :   APP_SRC_PATH + '/fonts',
        js      : APP_SRC_PATH + '/js',
    }
}
//--Compiler scss
gulp.task('compileScss',function()
{
    return gulp.src(APP_STRUCTURE.src.scss +'/**/*.scss')
    .pipe(gulpsass().on('error',function(error){
        console.log(error.message);
      }))//convert scss to css
    .pipe(gulp.dest(APP_STRUCTURE.tmp.css))
}
)
//--Copy
gulp.task('copy:images',function()
{
    return gulp.src(APP_STRUCTURE.src.images + '/**/*.{jpg,png,gif,svg}')
    .pipe(gulpcopy(APP_STRUCTURE.tmp.images,{
        prefix:2,
    }))
})
gulp.task('copy:fonts',function(){
    return gulp.src(APP_STRUCTURE.src.fonts +'/**/*.{otf,eot,svg,ttf,woff,woff2}')
    .pipe(gulpcopy(APP_STRUCTURE.tmp.fonts,{
        prefix:2,
    }))
})
gulp.task('copy:js',function(){
    return gulp.src(APP_STRUCTURE.src.js +'/**/*.js')
    .pipe(gulpcopy(APP_STRUCTURE.tmp.js,{
        prefix:2,
    }))
})
//--watch change
gulp.task('watchchange',function()
{
    gulp.watch(APP_STRUCTURE.src.scss +'/**/*.scss',gulp.series('compileScss'))
    gulp.watch(APP_STRUCTURE.src.images +'/**/*.{jpg,png,gif,svg}',{
        events: ['add','change'],
    },gulp.series('copy:images'))
    gulp.watch(APP_STRUCTURE.src.fonts + '/**/*.{otf,eot,svg,ttf,woff,woff2}',{
        events: ['add','change'],
    },gulp.series('copy:fonts'))
    gulp.watch(APP_STRUCTURE.src.js +'/**/*.js',gulp.series('copy:js'))
})