const fs = require('fs').promises;

module.exports = () => {
  const handler = async (resolve, reject) => {
    console.log('Loading credential files ...');
    try {
      const [tokenFile, credentialsFile] = await Promise.all([
        fs.readFile('./token.json'),
        fs.readFile('./credentials.json'),
      ]);

      console.log('Credential files loaded');

      const tokenJSON = JSON.parse(tokenFile);
      const credentialsJSON = JSON.parse(credentialsFile);

      console.log(
        'Google token will expire at',
        new Date(tokenJSON.expiry_date),
      );

      resolve([
        tokenJSON,
        credentialsJSON,
      ]);
    } catch (e) {
      reject('Error loading credential files');
    }
  };

  return new Promise(handler);
};
