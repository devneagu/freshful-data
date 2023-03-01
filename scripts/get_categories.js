const https = require('https');
const fs = require('fs');

const url = 'https://www.freshful.ro/api/v2/shop/categories';
const filePath = 'categories.json';

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File saved to ${filePath}`);
      }
    });
  });
}).on('error', (err) => {
  console.error(err);
});
