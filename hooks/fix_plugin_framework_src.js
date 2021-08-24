var replace = require("replace");

/**
 * Unifies com.android.support:support-vX libs to sdk 26
 */
module.exports = function() {
    console.log('Replacing com.android.support plugin dependency to fixed 26.+');
    replace({
        regex: 'com.android.support:support-v([0-9]{1,2}).+',
        replacement: 'com.android.support:support-v$1:26.+',
        paths: ['platforms/android/project.properties'],
        recursive: false,
        silent: false
    });
};
