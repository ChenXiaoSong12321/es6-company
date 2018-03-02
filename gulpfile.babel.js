import gulp from 'gulp'
import uglify from 'gulp-uglify'
import watchPath from 'gulp-watch-path'
import rename from 'gulp-rename'
// 引入gulp-if，gulp语句中做if判断的
import gulpif from 'gulp-if';
// gulp中处理文件拼接的
import concat from 'gulp-concat';
// 打包
import webpack from 'webpack';
// gulp处理文件流，结合webpack-stream来处理
import gulpWebpack from 'webpack-stream';
// 重命名做标志的
import named from 'vinyl-named';
// 处理文件信息流的
import plumber from 'gulp-plumber';

// 命令行工具输出的包
import {log,colors} from 'gulp-util';

// npm install babel-preset-es2015 babel-plugin-transform-decorators-legacy babel-loader babel-core babel-preset-env gulp gulp-uglify gulp-watch-path gulp-rename gulp-if gulp-concat webpack webpack-stream vinyl-named gulp-plumber gulp-util gulp-sass autoprefixer cssnano postcss-import gulp-postcss jquery babel-polyfill --save-dev

gulp.task('default', ['watch','watchSass'])


gulp.task('watch', ()=> {
	gulp.watch('include/es6Modules/*.js', function(event) {
		let paths = watchPath(event, 'include/es6Modules', 'include/min')
		paths.es5 = 'include/es5/'
		gulp.src('include/es6Modules/netwizard_new.js')
			.pipe(plumber({
				errorHandle:function(){

				}
			}))
			// 重命名
			.pipe(named())
			// 对js进行编译
			.pipe(gulpWebpack({
				module:{
					loaders:[{
						test:/\.js$/,
						loader:'babel-loader'
					}]
				}
			}),null,(err,stats)=>{
				// 对错误的处理
				log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
					chunks:false
				}))
			})
			// 文件放在哪里，把编译好的文件放在这个路径
			.pipe(gulp.dest(paths.es5))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify()) //paths.distDir为目录文件
			.pipe(gulp.dest(paths.distDir))
	})
})

gulp.task('hello',()=>{
	console.log(`hello world`)
})

import sass from 'gulp-sass'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import atImport from 'postcss-import'
import postcss from 'gulp-postcss'
gulp.task('sass',()=>{
	gulp.src('include/sass/*.scss')
		.pipe(sass({outputStyle:'compressed'})
			.on('error',sass.logError))
		// .pipe(gulp.dest('sass/css/'))
		.pipe(postcss([
			atImport,
			autoprefixer({
				browsers:['>10%']
			}),
			cssnano
		]))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('include/'))
})

gulp.task('watchSass',()=>{
	gulp.watch('include/sass/*.scss',['sass'])
})
