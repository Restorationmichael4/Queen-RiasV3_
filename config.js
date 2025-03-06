const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVkQzVmNlNFWGdFNzgxc0xMbGljTEV4ZzVuMzlPUFdWc0FTdWUyZGdubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1JUeXI5YWVGbFRCUGs3VU9ubGxBa1YzTk40WmFzMXFtOFBvMU1GS1d4ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTGVweEhYdm1kK1lLK3pQR0pLTHMwK2FTUjNvaEpkdkhlcTkzb3dsVTJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXWjBmNkY4cHZvb2lhV01ZL3RUTlI2N0RtYm9Oa2RnWURSN3VveXdGUjBNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdNL3ZXU2V2a0hMWWdYVkwwNSt2RDI0TEZXRFJuVUlHSnM3aHFaMVFtMGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtnNjZFeEMvN2N6WjdnMjUvLzZsTkNyUGVDbmwvSU16dnE3WlNDZlpJM2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVA5UnNRSlNvNmp6dTRVNDNubjZiNnRUWVduZGlJUlIvcmh0bUptckhXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNG5jR2pPN2JGbStYS2RrUWZDNHVDSGhYZzk2dk94MEdlN01NMEJtUm5uWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ild6eXkvTExTRHl4OFpTcGswL1Z6eTFoK3FJY0VjdkZLNFRUcWY4emtCTXM1bmFoZWVHNUFlZExUUmJzdGdMcHo0YVVmUjdFdUp0RmhiL2dwNDM0N0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJaNk9tOWdhR2VLcVNnYWJ2aXcyUzNTUGZQZ2lqSVpSTzMxV3A3RW03bWZzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIyS0dKRjQ2OSIsIm1lIjp7ImlkIjoiMjM0ODA4MzQzMzczODo2MUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjU1OTk4MjcwMTczMjMyOjYxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjZmdXFjRkVMS2hxTDRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWHExSHR1V1BHUFVBZi9iYXMzb3piVG9lNys4OHhVbkN4OEJLdzFSUGVGYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoielhzelRkV1l5a1g1NTl6UkN6NzNuaXd1eFNyc3JocVZJM1hMbGhBTGJXMElTN3o0OE5WWHd6clFHNXh2NlNwTHVZUHVvNUYrZHkyVmIvOHM4dU1oQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IkQyMjVURXFvcjJkZ0VqTnRsU0lyaVg0Qkc1Y1MzaldIakEyUUFzYjVPcW5OV3JxN3l2RXlaTDRBSWRRc2pjYzFlRzJUTEhNTTFlUzA2TEtzYlUySERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA4MzQzMzczODo2MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWNnRSN2JsanhqMUFILzIyck42TTIwNkh1L3ZQTVZKd3NmQVNzTlVUM2hYIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDEyOTU4MDcsImxhc3RQcm9wSGFzaCI6Im5tM0JiIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
