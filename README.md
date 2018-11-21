# i18n tool for Google Docs

Utility to fetch translations from Google Docs and store it in React Intl-compatible JSON-format.  

## Set up

### Step 1: Fork this repository.

### Step 2: Get `credentials.json`:

You can download it from [Google API Console](https://console.developers.google.com/apis/library) by creating new project. When you got it - put it in project root.

### Step 3: Generate `token.json`:

To generate it, run `npm run generate-token` and answer all the questions.

### Step 4: Create spreadsheet in Google Docs with following structure or create a copy of [sample spreadsheet](https://docs.google.com/spreadsheets/d/1FyViRU1-BFNK7lVq1d0wNgdbbdQUjiDv34AiLOGp1jE/edit#gid=0). 

| Link                  | ru          | en          | es          | fr          |
|-----------------------|-------------|-------------|-------------|-------------|
| Common.Buttons.Save   | Сохранить   | Save        | Guardar     | Sauvegarder | 
| Common.Buttons.Cancel | Отменить    | Cancel      | Anular      | Annuler     |

### Step 5: Specify document to app.

Create `.env` file by copying `.env.example` and fill fields. `SPREADSHEET_ID` can be found in spreadsheet url.

## Usage

To be sure that everything working use `npm run preview`

To get results and put it in repository use `npm start`.

All translations will be putted in `/translations` folder with `{locale}.json` format.
