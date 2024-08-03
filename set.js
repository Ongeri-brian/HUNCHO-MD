const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNlBLM3RHSGR2eVBSTmRiNVlWL1F2QllIMVJNVjhzcUxGdU41NlVTa0ZYTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0tXbk9mSWNncVA4eFRDMXZLVE9PczF0bFQ3ZGpGc0ZQWTR0SkhFcFNuOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQ1JQYjJBRDBLNEd2dWFDNGxRME9keDViZk5kM3RMUG5IK2ovM1YzMlVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxbDZ0eHg3VU9EN0xpaHdJMzEvOW0vckl4c29aYVlvQjJ2TGNwSStoblRJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFFdktVRXE1MmVoeCtmaERxM2pHNGFHUmNKaTRnV2ZWdkNvRDd6akJZa1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRqNWJrZXJ3NjBXeHZ0RDFGY1cxeXJKNDJrT2J4czBpbTdmSWpuSlJHRms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkxTb0RSdnpNc2hEV2lMcC9YUEMxcFRVSWZvV1ZRQTNNbVF6allEUDlHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlphL1V2dlZzY0xLYnpEcVN4K2ZJMGoxd1RYT1JGMlhQWDBJdENqRXJSND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBvbmpyeTY2SWo3cnVhY1J3S2lwMW1BTGVkVGJsQjg2RkIyOU5zVzFOU0gxZE1SL1BoaHl4MWZZTGZmd3NEVllIZEN3ZEVVQ3FSOEN0RUhRWXk5UWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjYsImFkdlNlY3JldEtleSI6IjRocURIT1g0Zm5tWjg3V1FlTmk2elBNKytndnMxRkZPQ2RuVjdHU2xwUXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IklOeV9hemRGUnhpUFQ2cXotRFoyN1EiLCJwaG9uZUlkIjoiYzljYzY0ZDctOTU2OC00NmJjLThkN2ItNmY5M2UzNDAzZDI1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii95U0Fvak45U3lKcTAvMGpIT2tMc0N0WE85dz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxM3ZBTFNNVWhHWFFaaHF3Ujl1VEk1UGx3M1k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ1JORDRYRVkiLCJtZSI6eyJpZCI6IjI1NDcxMzE0NTYxODo0NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFNpN00wRkVKR2d0N1VHR0JNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZkhVTkc3dDBFYzhmaVJwQUMrQThyOHVNaHFVa3J0aFNEWVhJVVJnQ2FDbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOWhObjZFalpyclBMeGRBai8rTFBjQ0JDRXNuRFBYVWFLZVpkaFhoY0VHQWFJRU43WDdjeEViZGp6Z3E2YTNvY0QvbnRlbzQxUEhieWhTajVWNzU5Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6IkNEME93VG9MT3J4aDlZUDByTUNrVjhSVk5iN0ZoRUFCSEdEN21ENUhXZGJ0M0JmMkptQURFL0lDMjRwTm1KYUhTN2x1MUJXeGFqRFpQWnkvRkk2RWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzEzMTQ1NjE4OjQ0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh4MURSdTdkQkhQSDRrYVFBdmdQSy9MaklhbEpLN1lVZzJGeUZFWUFtZ3EifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI2NjcwMzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRDgyIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ongeri Brian",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254713145618",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || 'https://github.com/Ongeri-brian/HUNCHO-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
