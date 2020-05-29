/**
 * parseData 
 * outpara: 
 *  image:png file name
 *  slices: info array
 *    x:image data start position x;
 *    y:image data start position y;
 *    width:image data width
 *    height:image data height
 *    offX:image data position x at output file
 *    offY:image data position y at output file
 *    outWidth:output png file width;
 *    outHeight:output png file height;
 */ 

function parseData(configData) {
  var data = {};
  data.image = configData.file;
  data.slice = [];
  for (var key in configData.frames) {
    var slice = {};
    var fileName = key.split("_");
    var ext = fileName.pop();
    fileName = fileName.join("_") + "." + ext;
    var info = configData.frames[key];
    slice.name = fileName;
    slice.x = info.x;
    slice.y = info.y;
    slice.width = info.w;
    slice.height = info.h;
    if (info.offX == undefined) {
      slice.offX = 0;
      slice.offY = 0;
      slice.outWidth = info.w;
      slice.outHeight = info.h;
    } else {
      slice.offX = info.offX;
      slice.offY = info.offY;
      slice.outWidth = info.sourceW;
      slice.outHeight = info.sourceH;
    }
    data.slice.push(slice);
  }
  return data;
}

module.exports = {
  parseData:parseData
}