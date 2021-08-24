var watch = require('@ionic/app-scripts/dist/watch');
var copy = require('@ionic/app-scripts/dist/copy');
var path = require('path');
var lint = require('@ionic/app-scripts/dist/lint');

// Custom watcher middleware to ling html changes

var files = [];

module.exports = {
    srcFiles: {
        paths: ['{{SRC}}/**/*.(ts|html|s(c|a)ss)'],
        options: { ignored: ['{{SRC}}/**/*.spec.ts', '{{SRC}}/**/*.e2e.ts', '**/*.DS_Store', '{{SRC}}/index.html'] },
        callback: (event, filePath, context) => {
            const ext = path.extname(filePath).toLowerCase();
            // for html add corresponding ts file as codelyzer recognizes it and lints
            if (ext === '.html') {
                files.push({ filePath: filePath.replace(new RegExp(ext + '$'), '.ts'), ext: '.ts' });
            }
            return watch.buildUpdate(event, filePath, context).then(() => {
                return lint.lintUpdate(files, context, false);
            }).then(() => {
                files.length = 0;
            });
        }
    },
    copyConfig: copy.copyConfigToWatchConfig()
};