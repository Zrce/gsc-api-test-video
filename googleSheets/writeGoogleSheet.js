const { google } = require('googleapis');

const writeGoogleSheet = async (arr,sheetname,spreadsheetId) => {
    let res = []

    try {
        const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets']})
        const sheets = await google.sheets({ version: 'v4', auth });
               
        const values = arr
    
        resource = {
            values,
        };
    
        try {
            const resp = await sheets.spreadsheets.values.append({
                spreadsheetId: spreadsheetId,
                range: sheetname,
                valueInputOption: 'RAW',
                resource,
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error) 
    }

    return res
}

const writeClearHeadlineGoogleSheet = async (arr,sheetname,spreadsheetId) => {
    let res = []

    try {
        const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets']})
        const sheets = await google.sheets({ version: 'v4', auth });

        try {
            const resp = await sheets.spreadsheets.values.clear({
                spreadsheetId: spreadsheetId,
                range: sheetname
            })
        } catch (error) {
            console.log(error)
        }
               
        const values = [arr]
    
        resource = {
            values,
        };
    
        try {
            const resp = await sheets.spreadsheets.values.append({
                spreadsheetId: spreadsheetId,
                range: sheetname,
                valueInputOption: 'RAW',
                resource,
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error) 
    }

    return res
}

module.exports = {
    writeGoogleSheet,
    writeClearHeadlineGoogleSheet
};