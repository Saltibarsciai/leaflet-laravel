let mix = require('laravel-mix');
require('laravel-mix-auto-extract');
require("laravel-mix-vue3");

mix.babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
})
    .webpackConfig({
        resolve: {
            symlinks: false,
            alias: {
                '@': path.resolve('resources/'),// just to use relative path properly
                'vue': 'vue/dist/vue.esm-bundler.js',
                'leaflet': path.join(__dirname, 'node_modules/leaflet')
            },
            extensions: ['*', '.js', '.vue', '.json']
        }
    })
    .options({
        uglify: {
            test: /\.js($|\?)/i
        },
        processCssUrls: false
    })
    .vue3('./resources/js/app.js', 'public/js')
    .override(config => {
        config.module.rules.find(rule =>
            rule.test.test('.svg')
        ).exclude = /\.svg$/;

        config.module.rules.push(
            {
                test: /\.svg$/,
                use: [{loader: 'html-loader'}]
            }
        )
    })
    .version();
