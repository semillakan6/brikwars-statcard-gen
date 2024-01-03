module.exports = {
  packagerConfig: {
    asar: true,
    icon: './img/favicon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './img/favicon.png'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './img/favicon.icns'
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
