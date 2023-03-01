const fs = require('fs');

const folderPath = './subcategories'; // example folder path
const regex = /"slug":"([^"]+)"/g;
const promises = [];

fs.readdirSync(folderPath).forEach((filename) => {
  const filePath = `${folderPath}/${filename}`;
  promises.push(
    new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
            const jsonData = JSON.parse(data);
            const products =  jsonData?.payload?.products;
            const slugs = products.map(el => el?.slug);
            resolve(slugs);
        }
      });
    })
  );
});

Promise.all(promises)
  .then((results) => {
    const slugs = results.flat().flat();
    fs.writeFileSync('product.json', JSON.stringify(slugs));
  })
  .catch((err) => {
    console.error(err);
  });
