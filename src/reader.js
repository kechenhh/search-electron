
const fs = require('fs');
const path = require('path');
// let strList = ['hfueawhfuha.do', '获取', '传入']


//同步读取文件列表
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList);  //递归读取文件
    } else {
      filesList.push(fullPath);
    }
  });
  return filesList;
}

// 获取周围字符 10个字符
// content 读取的原文
// str 匹配的字符
function aroundStr(content, str) {
  let str_before = content.split(str)[0].slice(-10);
  let str_after = content.split(str)[1].slice(0, 10);
  return str_before + str + str_after
}

// 获取匹配数组
// {
//   filePath: 'demofile\\1.txt', //路径
//   aroundStr: '\n当前目录为文件夹，获取文件夹路径，继续读取', //周围文字
//   checkStr: '获取' //查找的文字
// },
function getFileList(dir, strList) {
  let filesList = [];
  readFileList(dir, filesList);
  let checkFileList = []

  filesList.map(fileItem => {
    const contents = fs.readFileSync(fileItem, 'utf-8');
    let checkList = []
    strList.map(strItem => {
      let hasFlag = contents.includes(strItem);
      if (hasFlag && strItem) {
        //文件存在查找的字符
        let _aroundStr = aroundStr(contents, strItem)
        let fileI = fileItem.replace(/\\/g, "/");
        checkList.push({
          filePath: fileI, aroundStr: _aroundStr, checkStr: strItem
        })
      }
    })
    if (checkList.length > 0) {
      checkFileList.push(checkList)
    }
  })
  if (checkFileList.length > 0) {
    //二维转一维
    checkFileList = checkFileList.reduce(function (a, b) {
      return a.concat(b)
    });
    //按匹配字符相同的排序
    checkFileList.sort((a, b) => {
      if (a['checkStr'] != b['checkStr']) {
        return a['checkStr'].localeCompare(b['checkStr']);
      }
    })
  }


  return checkFileList
}

exports.getFileList = getFileList