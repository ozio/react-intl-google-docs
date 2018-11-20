const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

module.exports = (folderPath, data) => {
  const absoluteFolderPath = path.resolve(folderPath);

  console.log('Checking folder existing ...');
  try {
    fs.realpathSync(absoluteFolderPath);
    console.log('Folder exist');
  } catch (e) {
    console.log('Folder isnt\'t exist, creating new one ...');
    fs.mkdirSync(absoluteFolderPath);
    console.log('Folder created');
  }

  const promises = [];

  console.log('Creating translation files ...');
  Object.keys(data).forEach((key) => {
    const filename = `${key}.json`;
    const absolutePath = `${absoluteFolderPath}/${filename}`;

    console.log(`Creating ${folderPath}/${filename} ...`);

    promises.push(
      fsPromises.writeFile(absolutePath, JSON.stringify(data[key], null, 2))
    );
  });

  return Promise.all(promises);
};
