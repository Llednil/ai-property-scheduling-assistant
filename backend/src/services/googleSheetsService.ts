import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export async function getSheetValues(sheetName: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: sheetName,
  });

  const rows = response.data.values || [];
  const dataRows = rows.slice(2);

  const tenants = dataRows
    .filter((row) => row.length > 0)
    .map((row, index) => ({
      id: index + 1,
      address: row[0] || "",
      agency: row[1] || "",
      dueDate: row[2] || "",
      serviceType: row[3] || "",
      keyId: row[4] || "",
      zone: row[5] || "",
      sparky: (row[6] || "").toLowerCase() === "yes",
      option1: row[7] || "",
      option2: row[8] || "",
      contacted: row[9] || "",
      notes: row[10] || "",
    }));

  return tenants;
}

export async function getWorksheetNames() {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
  });

  const visibleSheets =
    spreadsheet.data.sheets?.filter(
      (sheet) => !sheet.properties?.hidden
    ) ?? [];

  return visibleSheets.map(
    (sheet) => sheet.properties?.title || ""
  );
}

export async function getAllSheetData() {
  const sheetNames = await getWorksheetNames();

  const allSheets = [];

  for (const sheetName of sheetNames) {
    const tenants = await getSheetValues(sheetName);

    allSheets.push({
      sheetName,
      tenants,
    });
  }

  return allSheets;
}