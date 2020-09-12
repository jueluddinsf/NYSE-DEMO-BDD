module.exports = {
    url: 'https://www.nyse.com/index',
    marketData: '#stats',
    marketDataTabs: '.ds-tab.ds-tab',
    nyseTab: '#stats > div > div > div:nth-child(1) > div > div > div:nth-child(2)',
    allColumns: '.ds-headerRow > div',
    volumeData: '#stats > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(2)',
    lastData: '#stats > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(3)',
    valueAndPercentageData: '#stats > div > div > div:nth-child(2) > div > div > div > div > div.ds-cell.d-flex-4',
    greenData: 'div.ds-cell.d-green.d-flex-4',
    redData: 'div.ds-cell.d-red.d-flex-4',
    allRows: '.ds-row',
    allRowsCompanyName: '.ds-row> div.ds-cell.d-flex-5'
};