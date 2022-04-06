module.exports = {
  "compilerOptions": {
    "module": "commonjs", // 编译生成的模块系统代码
    "target": "es2017", // 指定ecmascript的目标版本
    "noImplicitAny": true, // 禁止隐式any类型
    "outDir": "./dist",
    "sourceMap": false,
    "allowJs": false, // 是否允许出现js
    "newLine": "LF"
  },
  "include": ["src/**/*"]
}