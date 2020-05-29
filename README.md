# Sheet Spliter
---
A tool for split sprite sheet image


### 依赖库
```
colors: 输出带颜色命令行
npm install colors 
pngjs: nodejs png图像处理库
npm install pngjs
```

### 使用
下载附件，命令行执行
```
node {path to sheet_spliter.js} {sheet file path}
```
其中 ***sheet file path*** 可以为文件夹，也可以是纹理集json文件路径，如果是文件夹，则处理整个文件夹下的纹理集，如果路径为json文件，则只处理单个纹理集。
切割文件输入在json文件同目录，同名文件夹下。
