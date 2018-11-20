require('dotenv').config();

const loadCredentials = require('./load-credentials');
const getOAuth2Client = require('./get-oauth2client');
const getSpreadSheetCSV = require('./get-spreadsheet-csv');
const parseCSV = require('./parse-csv');
const saveToFS = require('./save-to-fs');

if (process.env.TEST_RUN === '1') {
  console.log('=== Test run ===');
}

(async () => {
  // load and set credentials
  const [token, credentials] = await loadCredentials();
  const oAuth2Client = getOAuth2Client(token, credentials);

  // load spreadsheet
  const spreadsheet = await getSpreadSheetCSV(oAuth2Client, process.env.SPREADSHEET_ID, process.env.SPREADSHEET_RANGE);

  // parse data
  const json = await parseCSV(spreadsheet);

  // save data
  if (process.env.TEST_RUN !== '1') {
    await saveToFS('./translations', json);
  } else {
    console.log(json);
  }

  console.log('Done!');
})();

