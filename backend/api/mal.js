// backend/api/mal.js
const fetch = require('node-fetch');

async function getAnimeDetails(title) {
    const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${title}`, {
        headers: { 'X-MAL-CLIENT-ID': 'a1a5b093fa3da04bf321b9bc04c3c0c9' }
    });
    return response.json();
}