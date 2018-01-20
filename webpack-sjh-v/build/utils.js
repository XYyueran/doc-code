
const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const glob =require("glob");
exports.getEntry=function(globPath,pathDir){
  var files= glob.sync(globPath);
  var entries={},entry,dirname,basename,pathname,extname;
  for(let i = 0; i<files.length; i++){
    entry =files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
    entries[pathname] = './' + entry;
  }
  return entries;
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}




// exports.createNotifierCallback = () => {
//   const notifier = require('node-notifier')

//   return (severity, errors) => {
//     if (severity !== 'error') return

//     const error = errors[0]
//     const filename = error.file && error.file.split('!').pop()

//     notifier.notify({
//       title: '测试',
//       message: severity + ': ' + error.name,
//       subtitle: filename || '',
//       icon: path.join(__dirname, 'logo.png')
//     })
//   }
// }