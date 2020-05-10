const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const arr = [];
// 是否能使用webp
const useWebp =
  document
    .createElement("canvas")
    .toDataURL("image/webp")
    .indexOf("data:image/webp") === 0;

/**
 * 递归读取文件
 *
 * @param {*} filePath 文件路径
 * @param {*} arr 目标数组
 * @returns
 */
function readDir(filePath, arr) {
  const files = fs.readdirSync(filePath);

  files.forEach(function (fileName) {
    // 判断是文件还是文件夹
    let filedir = path.join(filePath, fileName);
    let stats = fs.statSync(filedir);
    let isF = stats.isFile();
    let isD = stats.isDirectory();

    if (isF) {
      arr.push({ fileName, filedir });
    }
    if (isD) {
      readDir(filedir, arr);
    }
  });
  return arr;
}

/**
 * 文件数组
 *
 * @param {*} arr
 * @returns
 */
function isImg(arr) {
  return arr
    .map((key) => {
      const ext = path.extname(key.fileName);
      if (
        [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/].some((exp) => exp.test(ext))
      ) {
        return {
          filename: key.fileName,
          filedir: key.filedir,
          asset: fs.statSync(key.filedir).size,
        };
      }
    })
    .filter(Boolean);
}

/**
 * 图片文件
 *
 * @param {*} imgs
 */
function webp(imgs) {
  imgs.forEach((item) => {
    const o = path.parse(item.filedir);
    sharp(item.filedir)
      .webp()
      .toFile(`${o.dir}/${o.name}.webp`)
      .then(function (info) {
        console.log(info);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}
// 所有文件
const reasult = readDir(path.resolve(__dirname, "../src/assets/images"), arr);
// 筛选所有图片文件
const img = isImg(reasult);
// 生成webp
useWebp ? webp(img) : null;
