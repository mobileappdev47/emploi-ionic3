/**
 * Preparation scripts - replaces all variables in config.xml within .env values
 * Used as `node confog/prepare.js` in CI script
 * Stores original file as original.config.xml - restored after preparation by cordova hook.
 */
var fs = require('fs');
var compile = require('es6-template-strings/compile');
var resolveToString = require('es6-template-strings/resolve-to-string');

require('dotenv').config();

var configxml = fs.readFileSync('config.xml', 'utf8');
var compiled = compile(configxml);
var content = resolveToString(compiled, process.env);

//fs.writeFileSync('original.config.xml', configxml);
fs.writeFileSync('config.xml', content);
