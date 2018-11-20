const { google } = require('googleapis');

module.exports = (auth, spreadsheetId, range) => {
  console.log('Fetching spreadsheet ...');

  const handler = (resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    }, (err, res) => {
      if (err) {
        console.log('Spreadsheet fetching error', err);
        return reject(err);
      }

      const rows = res.data.values;

      let colsCount;
      let csv = '';

      rows.forEach((row, rowIdx) => {
        if (rowIdx === 0) colsCount = row.length;

        const diff = colsCount - row.length;
        if (diff !== 0) {
          for (let i = 0; i < diff; i++) {
            row.push('');
          }
        }

        csv += row.map((r) => {
          let string = r;

          if (string.includes('"') || string.includes(',')) {
            string = '"' + string.split('"').join('""') + '"'
          }

          return string.trim();
        }).join(',');
        csv += '\n';
      });

      console.log('Spreadsheet loaded');
      resolve(csv);
    })
  };

  return new Promise(handler);
};
