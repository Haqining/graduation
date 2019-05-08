import productImage from '../../../assets/product.jpg';

//status
//auctioned:已拍出 auctioning:正在拍卖
export default [
  {
    key: '0',
    productCover: productImage,
    productImages: [productImage, productImage, productImage],
    productName: '明基BenQ ScreenBar Plus 灯',
    productIntroduction:
      '商家详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。',
    productType: '灯具',
    productQuantity: 1,
    startingPrice: 200.01,
    priceIncrease: 20,
    currentPrice: 200.1,
    dealPrice: 200.1,
    bidderNumber: 1,
    auctionTimes: 3,
    shelfTime: '2018-01-01',
    deadline: '2018-01-05',
    status: 'auctioned'
  },
  {
    key: '1',
    productCover: productImage,
    productImages: [productImage],
    productName: '明基BenQ ScreenBar Plus 灯',
    productIntroduction:
      '商家详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。',
    productType: '灯具',
    productQuantity: 1,
    startingPrice: 200.01,
    priceIncrease: 20,
    currentPrice: 200.1,
    dealPrice: '-',
    bidderNumber: 1,
    auctionTimes: 3,
    shelfTime: '2018-01-01',
    deadline: '2018-01-05',
    status: 'auctioning'
  }
];
