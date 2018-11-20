const csv = require('csv');

const langs = {
  French: 'fr',
  Spanish: 'es',
  Chinese: 'zh',
  English: 'en',
  Russian: 'ru',
};

module.exports = (data) => {
  console.log('Parsing spreadsheet data ...');
  const handler = (resolve, reject) => {
    csv.parse(data, {
      columns: true,
      delimiter: ',',
      skip_empty_lines: true,
      trim: true,
    }, (err, rows) => {
      if (err) {
        return reject(err);
      }

      const langs = {
        French: 'fr',
        Spanish: 'es',
        Chinese: 'zh',
        English: 'en',
        Russian: 'ru',
      };

      const library = {};

      rows.forEach((row) => {
        let link;

        Object.keys(row).forEach((key) => {
          if (key === 'Link') {
            link = row[key];
          } else {
            if (link === '') return;

            const lang = langs[key];

            if (!library[lang]) library[lang] = {};

            if (row[key] === '') return;

            library[lang][link] = row[key];
          }
        });
      });

      console.log('Spreadsheet parsed');
      resolve(library);
    });
  };

  return new Promise(handler);
};
