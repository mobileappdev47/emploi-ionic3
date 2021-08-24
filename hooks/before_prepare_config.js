var fs = require('fs');
var compile = require('es6-template-strings/compile');
var resolveToString = require('es6-template-strings/resolve-to-string');

require('dotenv').config();

/**
 *
 */
module.exports = function() {
    var configxml = fs.readFileSync('config.xml', 'utf8');
    var compiled = compile(configxml);
    var content = resolveToString(compiled, process.env);
    console.log('content', content);

    //fs.writeFileSync('original.config.xml', configxml);
    fs.writeFileSync('config.xml', content);
};
