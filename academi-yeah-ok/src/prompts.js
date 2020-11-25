import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

export default class PromptStore {
  prompts;

  async loadPrompts() {
    // if play testing, load from google sheet
    await this.fetchSpreadsheet();
  }

  getPrompt(num) {
    return this.prompts ? this.prompts[num] : undefined;
  }

  getRandomPrompt() {
    let index = Math.floor(Math.random() * this.prompts.length);
    return this.getPrompt(index);
  }

  async fetchSpreadsheet() {
    return new Promise(async (accept) => {
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

      try {
        await doc.useServiceAccountAuth({
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY,
        });
        // loads document properties and worksheets
        await doc.loadInfo();

        console.log(("Sucessfully loaded", doc.title));

        // now load in row count of sheet prompts
        const sheet = doc.sheetsByIndex[0];
        this.prompts = await sheet.getRows();
        console.log("Found prompts", this.prompts);
        accept();
      } catch (e) {
        console.error("Error: ", e);
        accept();
      }
    });
  }
}
