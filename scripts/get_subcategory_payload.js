const axios = require('axios');
const fs = require('fs');

const subcategories = JSON.parse(fs.readFileSync('subcategory.json', 'utf8'));
const folderPath = './subcategories'; // example folder path

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const fetchSubcategory = async (subcategory) => {
  const url = `https://www.freshful.ro/api/v2/shop/categories/${subcategory}`;
  try {
    const response = await axios.get(url);
    const filePath = `${folderPath}/${subcategory}.json`;
    fs.writeFile(filePath, JSON.stringify(response.data), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Subcategory data saved to ${filePath}`);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const fetchAllSubcategories = async () => {
  const promises = subcategories.map((subcategory) => fetchSubcategory(subcategory));
  await Promise.all(promises);
  console.log('All subcategory data saved');
};

fetchAllSubcategories();