const { google } = require("googleapis");
const {
  writeGoogleSheet,
  writeClearHeadlineGoogleSheet,
} = require("./googleSheets/writeGoogleSheet.js");
const moment = require("moment-timezone");

const go = async (spreadsheetId) => {
  let lastWeekStart = moment()
    .subtract(1, "weeks")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");
  let lastWeekEnd = moment()
    .subtract(1, "weeks")
    .endOf("isoWeek")
    .format("YYYY-MM-DD");

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
  const gsc = await google.webmasters({ version: "v3", auth });

  let sheet = [];
  sheet.push(["Clicks", "Impressions", "CTR"]);

  let res = await gsc.searchanalytics.query({
    siteUrl: "https://zrcefashion.com",
    requestBody: {
      startDate: lastWeekStart,
      endDate: lastWeekEnd,
    },
  });

  let dataRow = [];
  dataRow.push(res.data.rows[0].clicks);
  dataRow.push(res.data.rows[0].impressions);
  dataRow.push(res.data.rows[0].ctr);
  sheet.push(dataRow);

  try {
    await writeGoogleSheet(sheet, "Output", spreadsheetId);
  } catch (error) {
    console.log(error);
  }
};

exports.startit = async (req, res) => {
  let spreadsheetId = process.env.SHEET_ID;

  //local test
  if (spreadsheetId === undefined) {
    spreadsheetId = req;
  }

  await go(spreadsheetId);
  res.send("done");
};
