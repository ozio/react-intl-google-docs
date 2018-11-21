const csv = require('csv');

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

      const library = {};

      rows.forEach((row) => {
        let link;

        Object.keys(row).forEach((key) => {
          if (key === 'Link') {
            link = row[key];
          } else {
            if (link === '') return;

            if (!library[key]) library[key] = {};

            if (row[key] === '') return;

            library[key][link] = row[key];
          }
        });
      });

      console.log('Spreadsheet parsed');
      resolve(library);
    });
  };

  return new Promise(handler);
};
