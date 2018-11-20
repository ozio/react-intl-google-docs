const { google } = require('googleapis');

module.exports = (token, credentials) => {
  console.log('Setting oAuth2 credentials ...');

  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);

  console.log('oAuth2 credentials set');

  return oAuth2Client;
};
