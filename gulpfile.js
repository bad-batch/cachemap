const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const ts = require('gulp-typescript');
const merge = require('merge-stream');
const { Linter } = require('tslint');
const webpack = require('webpack-stream');

gulp.task('clean', () => del('lib/*', { force: true }));

gulp.task('main', () => {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
  });

  const babelrc = {
    ignore: ['**/*.d.ts'],
    plugins: ['lodash'],
    presets: [
      ['@babel/preset-env', {
        debug: true,
        targets: { node: '6' },
        useBuiltIns: 'usage',
      }],
      '@babel/preset-stage-0',
    ],
  };

  const transpiled = gulp.src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel(babelrc))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib/main'));

  const copied = gulp.src(['src/**/*.d.ts'])
    .pipe(gulp.dest('lib/main'));

  return merge(transpiled, copied);
});

gulp.task('module', () => {
  const tsProject = ts.createProject('tsconfig.json');

  const babelrc = {
    ignore: ['**/*.d.ts'],
    plugins: ['lodash'],
    presets: [
      ['@babel/preset-env', {
        debug: true,
        modules: false,
        targets: { node: '6' },
        useBuiltIns: 'usage',
      }],
      '@babel/preset-stage-0',
    ],
  };

  return gulp.src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel(babelrc))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib/module'));
});

gulp.task('browser', () => webpack(require('./webpack.config')) // eslint-disable-line global-require
  .pipe(gulp.dest('lib/browser')));

gulp.task('type-check', () => {
  const tsProject = ts.createProject('tsconfig.json', {
    noEmit: true,
  });

  gulp.src(['src/**/*.ts'])
    .pipe(tsProject());
});

gulp.task('lint', () => {
  gulp.src(['src/**/*.ts'])
    .pipe(tslint({
      configuration: 'tslint.json',
      fix: true,
      formatter: 'stylish',
      program: Linter.createProgram('tsconfig.json'),
    }))
    .pipe(tslint.report());
});
