const fs = require('fs');

const filePath = 'categories.json';

try {
    const fileData = fs.readFileSync(filePath, 'utf8');

    const str = fileData;
    const regex = /"slug":"([^"]+)"/g;
    const slugs = [];
    let match;
    while ((match = regex.exec(str))) {
        slugs.push(match[1]);
    }
    fs.writeFileSync('subcategory.json', JSON.stringify(slugs));
} catch (err) {
  console.error(err);
}
