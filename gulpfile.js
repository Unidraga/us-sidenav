const fs = require('fs');
const gulp = require('gulp');
const less = require('less');
const inliner = require('gulp-inline-ng2-template');

function lessProcessor(path, ext, file, callback) {
  let styles = fs.readFileSync(path).toString();
  less.render(styles).then(output => {
    callback(null, output.css);
  }).catch(err => console.error(err));
}

const inlinerConfigs = {
  src: './src/**/*.ts',
  dest: './tmp',
  settings: {
    base: '/src',
    target: 'es6',
    useRelativePaths: true,
    styleProcessor: lessProcessor
  }
};

gulp.task('inline', () => {
  return gulp.src(inlinerConfigs.src)
    .pipe(inliner(inlinerConfigs.settings))
    .pipe(gulp.dest(inlinerConfigs.dest));
});
