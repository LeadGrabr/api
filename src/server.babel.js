//  enable runtime transpilation to use ES6/7 in node
/* eslint-disable */
var fs = require('fs')
var babelrc = fs.readFileSync('./package.json')
var config

try {
    config = JSON.parse(babelrc).babel
} catch (err) {
    console.error('==>     ERROR: Error parsing your babel entry in package.json.')
    console.error(err)
}

require('babel-register')(config)
/* eslint-enable */
