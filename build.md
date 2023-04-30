### 打包

```bash
#安装
npm install electron-builder --save-dev
```

package.json

```json
{
  "scripts": {
    "pack": "vue-cli-service build && electron-builder --dir",
    "dist": "vue-cli-service build && electron-builder"
  }
}
```

```json
{
  "build": {
    "appId": "ocr-electron",
    "productName": "ocr-electron",
    "icon": "public/favicon.ico",
    "copyright": "Copyright © 2022",
    "compression": "maximum",
    "asar": true,
    "win": {
      "icon": "public/favicon.ico",
      "target": "nsis",
      "legalTrademarks": "changbin1997"
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": false
    },
    "directories": {
      "output": "release"
    },
    "files": [
      "**/*",
      "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
      "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
      "!**/node_modules/*.d.ts",
      "!**/node_modules/.bin",
      "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
      "!.editorconfig",
      "!**/._*",
      "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
      "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
      "!**/{appveyor.yml,.travis.yml,circle.yml}",
      "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}",
      "!**/src/components/**",
      "!**/src/assets/**",
      "!**/src/main.js",
      "!**/src/App.vue",
      "!**/public/index.html"
    ]
  }
}
```

