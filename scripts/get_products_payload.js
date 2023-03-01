const axios = require('axios');
const fs = require('fs');

const products = JSON.parse(fs.readFileSync('product.json', 'utf8'));
const folderPath = './products'; // example folder path
const batchSize = 25;

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const fetchProduct = async (productSlug, retries = 5) => {
  const url = `https://www.freshful.ro/api/v2/shop/product-by-slug/${productSlug}`;
  try {
    const response = await axios.get(url);
    const filePath = `${folderPath}/${productSlug}.json`;
    fs.writeFile(filePath, JSON.stringify(response.data), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`productSlug data saved to ${filePath}`);
      }
    });
  } catch (err) {
    if (retries > 0) {
      console.error(`Request failed: ${err.message}. Retrying...`);
      await fetchProduct(productSlug, retries - 1);
    } else {
      console.error(`Request failed: ${err.message}. No more retries.`);
    }
  }
};

const fetchProductBatch = async (productSlugs) => {
  const promises = productSlugs.map((productSlug) => fetchProduct(productSlug));
  await Promise.all(promises);
  console.log(`Batch of ${productSlugs.length} products data saved`);
};

const fetchAllProducts = async () => {
  const numBatches = Math.ceil(products.length / batchSize);
  for (let i = 0; i < numBatches; i++) {
    const start = i * batchSize;
    const end = start + batchSize;
    const batch = products.slice(start, end);
    await fetchProductBatch(batch);
  }
  console.log('All products data saved');
};

fetchAllProducts();
