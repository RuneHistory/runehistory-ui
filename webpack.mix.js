let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss', 'public/css/bootstrap.css')
    .copy('node_modules/bootstrap-vue/dist/bootstrap-vue.css', 'public/css')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .version();