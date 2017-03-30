/* eslint-disable */
var fs = require('fs')
var path = require('path')
var eslint = require('/eslint')
var _ = require('/lodash')
var argv = require('yargs')
var lintDir = __dirname + '/assets'
var cli = new eslint.CLIEngine({
  configFile: __dirname + '/.eslintrc',
  useEslintrc: true,
  ignore: true,
  ignorePath: __dirname + '/.eslintignore',
  extensions: ['jsx', 'js']
})
var report = cli.executeOnFiles([lintDir])

if (report.errorCount > 0) {
  var fileList = report.results.filter((item)=> item.errorCount > 0)
    .map((item)=> item.filePath)
  console.log(`
    源码不规范，请检查这些文件:
    ${fileList.join('\n')}\n\n
  `)
  process.exit(1)
}
console.log('ESLint成功完成!')
