"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSpreadsheet = void 0;
const googleapis_1 = require("googleapis");
require("dotenv").config({ path: ".env" });
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY && process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
const checkSpreadsheet = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new googleapis_1.google.auth.JWT(CLIENT_EMAIL, '', PRIVATE_KEY, ['https://www.googleapis.com/auth/spreadsheets']);
    const sheet = googleapis_1.google.sheets({ version: 'v4', auth: client });
    const { data: { values } } = yield sheet.spreadsheets.values.get({
        auth: client,
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!A1:B`
    });
    if (!values)
        return true;
    for (let i = values.length - 1; i > 0; i--) {
        if (values[i][0] == id) {
            return false;
        }
    }
    return true;
});
exports.checkSpreadsheet = checkSpreadsheet;
