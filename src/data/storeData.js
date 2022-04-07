import faker from '@faker-js/faker';

let productData = [];

for (let i = 1; i <= 500; i++) {
  productData.push({
    productId: 'bs_auction_' + i,
    productName: faker.commerce.product(),
    productPrice: faker.commerce.price()
  });
}

export default productData;
