export default defineAppConfig({
  pages: ['pages/index/index', 'pages/self-center/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#1296DB',
    backgroundColor: 'FFF',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '',
        iconPath: './asset/icons/home-grey.png',
        selectedIconPath: './asset/icons/home-blue.png',
      },
      {
        pagePath: 'pages/self-center/index',
        text: '',
        iconPath: './asset/icons/self-center-grey.png',
        selectedIconPath: './asset/icons/self-center-blue.png',
      },
    ],
  },
})
