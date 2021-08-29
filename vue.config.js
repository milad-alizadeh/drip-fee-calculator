module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  pwa: {
    name: 'Drip Tax Calculator',
    themeColor: '#17a2b8',
    msTileColor: '#ffffff',
    manifestOptions: {
      name: 'Drip Tax Calculator',
      short_name: 'Drip tax',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#17a2b8',
    },
  },
}
