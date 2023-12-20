/**
 * electron-builder的配置文件,使用时通过 --config 指定
 * 如 electron-builder --config ./electron-builder.config.js
 * 各配置项参考官方文档： https://www.electron.build/configuration/configuration
 */

module.exports = {
  appId: 'com.electron.dooring',
  productName: "dooring-saas",
  asar: true,
  copyright: 'Copyright © 2023 dooring',
  compression: 'maximum',
  directories: {
    buildResources: 'resource',
    output: 'release',
  },
  files: ['main', 'resource'],
  mac: {
    artifactName: 'dooring.${ext}',
    target: ['dmg'],
    icon: 'resource/icon.png',
  },
  win: {
    icon: 'resource/icon.png',
    artifactName: 'dooring.${ext}',
    target: [
      {
        target: 'nsis',
        arch: ['ia32'],
      },
    ],
  },
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'dooring',
    include: 'resource/script/installer.nsh',
  },
};
