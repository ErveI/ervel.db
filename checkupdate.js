const axios = require('axios');
const packageJson = require('./package.json');

global.hasCheckedForUpdates = global.hasCheckedForUpdates || false;

async function checkUpdates() {
try {
const data = await axios({ method: 'GET', url: 'https://registry.npmjs.org/ervel.db/latest' }).then(res => res.data.version)
if (packageJson.version !== data) {
return console.error('Your Ervel.db version is outdated.\nUpdate it by running "npm i ervel.db@latest"');
} 
} catch (err) {
if(err.message == "Request failed with status code 429") {
return console.error('Too many requests to check the latest version of Ervel.db. Please try again later.');
}
return console.error("Error occurred while checking for updates:", err);
}
}

async function initCheckUpdates() {
    if (!global.hasCheckedForUpdates) {
        await checkUpdates();
        global.hasCheckedForUpdates = true;
    }
}

module.exports = { initCheckUpdates };

