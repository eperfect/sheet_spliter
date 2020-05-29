/**
 * dependencies 
 * colors: npm install colors
 * pngjs: npm install pngjs
 */
var fs = require("fs");
var path = require("path");
var colors = require('colors');
var PNG = require("pngjs").PNG;


function spliteSheet(sliceData, filePath) {
  var dirPath = path.dirname(filePath);
  var fileName = path.basename(filePath, ".json");
  var imagePath = path.join(dirPath, sliceData.image);
  var imageData = fs.readFileSync(imagePath);
  var sourceImage = PNG.sync.read(imageData);
  var outputDir = path.join(dirPath +"/"+ fileName);
  console.log("Output to:".green, outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (var i = 0; i < sliceData.slice.length; i++) {
    var info = sliceData.slice[i];
    var outputImage = new PNG({ width: info.outWidth, height: info.outHeight });
    PNG.bitblt(sourceImage, outputImage,info.x, info.y, info.width, info.height, info.offX, info.offY);
    var buffer = PNG.sync.write(outputImage);
    fs.writeFileSync(path.join(outputDir, info.name), buffer);
  }
}

function processFile(filePath) {
  console.log("Processing:".green, filePath);
  var fileContent = fs.readFileSync(filePath);
  var jsonData = JSON.parse(fileContent.toString());
  var sliceData = dataParser.parseData(jsonData);
  spliteSheet(sliceData, filePath);
}

function processDir(dirPath) {
  var files = fs.readdirSync(dirPath);
  files.forEach(function(fileName){
    var filePath = path.join(dirPath, fileName);
    processPath(filePath);
  });
}

function processPath(pathName) {
  var stat = fs.lstatSync(pathName);
  var isDir = stat.isDirectory();
  if (isDir) {
    processDir(pathName);
  } else {
    var ext = path.extname(pathName);
    if (ext == ".json") {
      processFile(pathName);
    }
  }
}
var argv = require('minimist')(process.argv.slice(2));
var filePath = argv.p || argv._[0];
var isExist = fs.existsSync(filePath);
var dataParser = require("./egret_parser");
if (!isExist) {
  return console.error("ERROR! " + filePath + "not found!");
}
processPath(filePath);
