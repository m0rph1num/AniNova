// backend/api/anilibria.js
const fetch = require('node-fetch');

async function getLatestEpisodes() {
    const response = await fetch('https://api.anilibria.tv/v2/getUpdates');
    const data = await response.json();
    return data;
}