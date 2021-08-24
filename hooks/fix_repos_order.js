var replace = require("replace");

/**
 * Fixes jcenter/maven repos order
 */
module.exports = function() {
    console.log('Fixing meaven/jcenter repos order');
    replace({
        regex: /jcenter\(\).*?\n.+?maven \{.*?\n.+?url "https:\/\/maven.google.com".*?\n.+?\}/gm,
        replacement: '// jcenter()\n        maven {\n            url "https://maven.google.com"\n        }\n        jcenter()',
        multiline: true,
        paths: ['platforms/android/build.gradle'],
        recursive: false,
        silent: false
    });
};
