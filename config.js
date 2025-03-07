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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlA1ZDRCZGo0WXRDRE9mbE00MHRhbmlhSE1RT1JVMVUxRktMSSszYUJtcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVkNMWWdvZEloSnc4OHNKSXhVVHlCWGtNbmZGVkpuUGZiUDJZTlZSV0wxOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TFprY2hQSnV4ZDRWV1h1UUdXRmN0RktrYUZ4TUNWNEFLT2VNeWYxcUY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzOWZJNEowNlJXckpiaXN6aUhzTFpjT1NrT0hTOFFnaS85TXpBZkVWR21RPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndMaEsrZDI2cEhLK1pWNlJwY2NDdHhpVW9scmRaQ3RpVjV4WGs4N09yMDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InI2TldYbm1kZnZ2YU9oNkNxMzBIUU5aN3hRRVJPd0tITWUrQ0JHeURneE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUlZM0lPMG1zb0kveVNVU0ZBczBsWTZVN0NKczJCdWxkb3RSbnFKOTVIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmRoeVRUbHA5QmQ5djdzRWdGTCtVS1pxbnF6R0pFK2xMNWVEdE8zS3JVaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNtRkJXVFQvZ1hPQ1FpSkIxaUt1eitQVTdrUEN6YjlmSHo1YjNXZWQ0RmFqb1Q4VytnYzlGQ1FlUmEyVTVwK1ZjMUNPNnRsNncvUGg3Z3JCUW45YkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDksImFkdlNlY3JldEtleSI6IlFRcDNUU0dvdHdtUUVITFYxbVUxYUJIWG9mNmw0L1RjM1o4Q2UzMExtL0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkhISkwzMVZRIiwibWUiOnsiaWQiOiIyMzQ4MDgzNDMzNzM4OjY0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiNTU5OTgyNzAxNzMyMzI6NjRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKK2Z1cWNGRUw3anJiNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJYcTFIdHVXUEdQVUFmL2JhczNvemJUb2U3Kzg4eFVuQ3g4Qkt3MVJQZUZjPSIsImFjY291bnRTaWduYXR1cmUiOiJKbzVDcENwb29GR1Z4Y2ZjcVJ0OEpkaEZ3RmI3QzdOSktBSUZDeDA0MHU2ZUV1S3dxc0xIOUZDUWhlM0JjQ1JHeTNMTnpicWFzSHg0K3QraWQvRW5CQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibG8xS1poNndSTDhnSWVnY0dsWFNvdy94d0MzRDRheVJiTUdNSkxZcDYvRVR4Y2VOL2hJbFh5d1VtYVA4YkhnS2V3YWM5VTFIYVhzc3hHY2hKcERqRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDgzNDMzNzM4OjY0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlY2dFI3YmxqeGoxQUgvMjJyTjZNMjA2SHUvdlBNVkp3c2ZBU3NOVVQzaFgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTM4NjE4OCwibGFzdFByb3BIYXNoIjoibm0zQmIifQ==",
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
