const gulp = require('gulp');
const gulpsass = require('gulp-sass');
const gulpcopy = require('gulp-copy');
const gulpImageMin = require('gulp-imagemin');
const nunjucks = require('gulp-nunjucks');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();
const gulpPlumber = require('gulp-plumber');
const gulpDependents = require('gulp-dependents');
const gulpcleancss = require('gulp-clean-css');
const gulpclean = require('gulp-clean');
const data = require('gulp-data');
//init libary
gulpsass.compiler = require ('node-sass');
//---config structure 
const APP_SRC_PATH = './src';
const APP_TMP_PATH = './tmp';
const APP_DIST_PATH = './dist';
const APP_STRUCTURE = {
    tmp :{
        css     : APP_TMP_PATH + '/css',
        images    :  APP_TMP_PATH + '/images',
        fonts   : APP_TMP_PATH + '/fonts',
        js      : APP_TMP_PATH + '/js',
        htmls   : APP_TMP_PATH + '/htmls',
        videos   : APP_TMP_PATH + '/videos',
        data   : APP_TMP_PATH + '/datas',
    },
    src :{
        scss    :  APP_SRC_PATH + '/scss',
        images    :  APP_SRC_PATH + '/images',
        fonts   :   APP_SRC_PATH + '/fonts',
        js      : APP_SRC_PATH + '/js',
        njk  : APP_SRC_PATH + '/njk',
        templates : APP_SRC_PATH + '/njk/templates',
        videos   : APP_SRC_PATH + '/videos',
        data   : APP_SRC_PATH + '/datas',
    },
    dist:{
        scss    :  APP_DIST_PATH + '/scss',
        images    :  APP_DIST_PATH + '/images',
        fonts   :   APP_DIST_PATH + '/fonts',
        js      : APP_DIST_PATH + '/js',
        htmls   :APP_DIST_PATH + '/htmls',
        videos   : APP_DIST_PATH + '/videos',
        data   : APP_DIST_PATH + '/datas',
    }
}
//--
gulp.task('clean:tmp', function () {
    return gulp.src(APP_TMP_PATH, {read: false,allowEmpty: true})
    .pipe(gulpclean());
});
//--Compiler scss
gulp.task('compileScss',function()
{
    return gulp.src(APP_STRUCTURE.src.scss +'/**/*.scss')
    .pipe(gulpPlumber())
    .pipe(gulpDependents())
    .pipe(gulpsass().on('error',function(error){
        console.log(error.message);
      }))//convert scss to css and check error
    .pipe(gulp.dest(APP_STRUCTURE.tmp.css))
}
)
//--Copy
gulp.task('copy:images',function()
{
    return gulp.src(APP_STRUCTURE.src.images + '/**/*.{jpg,png,gif,svg}')
    .pipe(gulpPlumber())
    .pipe(gulpDependents())
    .pipe(gulpcopy(APP_STRUCTURE.tmp.images,{
        prefix:2,
    }))
})
gulp.task('copy:fonts',function(){
    return gulp.src(APP_STRUCTURE.src.fonts +'/**/*.{otf,eot,svg,ttf,woff,woff2}')
    .pipe(gulpPlumber())
    .pipe(gulpcopy(APP_STRUCTURE.tmp.fonts,{
        prefix:2,
    }))
})
gulp.task('copy:js',function(){
    return gulp.src(APP_STRUCTURE.src.js +'/**/*.js')
    .pipe(gulpPlumber())
    .pipe(gulpcopy(APP_STRUCTURE.tmp.js,{
        prefix:2,
    }))
})
gulp.task('copy:videos',function(){
  return gulp.src(APP_STRUCTURE.src.videos +'/**/*.{mp4,webm}')
  .pipe(gulpPlumber())
  .pipe(gulpcopy(APP_STRUCTURE.tmp.videos,{
      prefix:2,
  }))
})
gulp.task('copy:datas',function(){
  return gulp.src(APP_STRUCTURE.src.data +'/**/*.json')
  .pipe(gulpPlumber())
  .pipe(gulpcopy(APP_STRUCTURE.tmp.data,{
      prefix:2,
  }))
})
//--image min
gulp.task('image:min',function(){
    return gulp.src(APP_STRUCTURE.src.images + '/**/*.{jpg,png,gif,svg}')
    .pipe(gulpPlumber())
    .pipe(gulpDependents())
    .pipe(gulpImageMin())
    .pipe(gulp.dest(APP_STRUCTURE.dist.images));
});
//--convert nunjuck to HTML
gulp.task('convertNunjucks',function(){
    return gulp.src(APP_STRUCTURE.src.njk + '/pages/*.njk')
    .pipe(data(function() {
        return require('./src/datas/data.json')
      }))
    .pipe(nunjucksRender({
        path : APP_STRUCTURE.src.njk.templates,
    }))
    .pipe(gulp.dest(APP_TMP_PATH))
})
//--Minifying CSS
gulp.task('cleancss',function(){
    return gulp.src(APP_STRUCTURE.tmp.css + '/*.css')
    .pipe(gulpcleancss())
    .pipe(gulp.dest(APP_STRUCTURE.dist.css))
})
//--auto reload
gulp.task('browserSync:start',function(){
    return browserSync.init({
        reloadDelay:300,
        open:false,
        notify:{
            styles:['display:none']
        },
        server:{
            baseDir:APP_TMP_PATH,
            index:'index.html',
        }
    })
});
gulp.task('browserSync:reload',function(done){
    browserSync.reload();
    return done();
})
//--watch change
gulp.task('watchchange',function()
{
    gulp.watch(APP_STRUCTURE.src.njk +'/**/*.njk',gulp.series('convertNunjucks','browserSync:reload'))
    gulp.watch(APP_STRUCTURE.src.scss +'/**/*.scss',gulp.series('compileScss','browserSync:reload'))
    gulp.watch(APP_STRUCTURE.src.data +'/**/*.json',gulp.series('copy:datas','convertNunjucks','browserSync:reload'))
    gulp.watch(APP_STRUCTURE.src.images +'/**/*.{jpg,png,gif,svg}',{
        events: ['add','change'],
    },gulp.series('copy:images','browserSync:reload'))
    gulp.watch(APP_STRUCTURE.src.fonts + '/**/*.{otf,eot,svg,ttf,woff,woff2}',{
        events: ['add','change'],
    },gulp.series('copy:fonts','browserSync:reload'))
    gulp.watch(APP_STRUCTURE.src.js +'/**/*.js',gulp.series('copy:js','browserSync:reload'))
    gulp.watch(APP_STRUCTURE.src.videos +'/**/*.{mp4,webm}',{
      events: ['add','change'],
  },gulp.series('copy:videos','browserSync:reload'))
})
//--dev
gulp.task('dev',
  gulp.series(
    'clean:tmp',
    'copy:images',
    'copy:fonts',
    'copy:js',
    'copy:videos',
    'copy:datas',
    'compileScss',
    'convertNunjucks',
    gulp.parallel(
      'watchchange',
      'browserSync:start'
    )
  )
)

// 1. Compile .njk to html
// 2. Viết cho tạo file .scss chỉ build đúng file mình sửa
// 3. Viết hoàn tất môi trường dev
// 3. Viết hoàn tất môi trường prod