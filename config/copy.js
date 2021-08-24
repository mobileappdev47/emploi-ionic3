var original = require('@ionic/app-scripts/config/copy.config');

module.exports = Object.assign(original, {
    copyFontawesomeFonts: {
        src: ['{{ROOT}}/node_modules/font-awesome/fonts/**/*', '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
        dest: '{{WWW}}/assets/fonts'
    },
});
