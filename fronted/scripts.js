const API_URL = 'http://localhost:3000/api/anime';
const ANILIBRIA_API = 'https://api.anilibria.tv/v2';

async function loadAnime() {
    try {
        const [animeResponse, updatesResponse] = await Promise.all([
            fetch(API_URL),
            fetch(`${ANILIBRIA_API}/getUpdates`)
        ]);
        
        const animeData = await animeResponse.json();
        const updatesData = await updatesResponse.json();
        
        renderCards(animeData, updatesData.list);
    } catch (error) {
        console.error('Ошибка:', error);
        showError();
    }
}

function renderCards(animeList, updatesList) {
    const containers = {
        'new-cards': { title: 'Новые эпизоды', filter: 'Новое' },
        'released-cards': { title: 'Вышедшие', filter: 'Вышедшее' },
        'announced-cards': { title: 'Анонсированные', filter: 'Анонсированное' }
    };

    for (const [containerId, config] of Object.entries(containers)) {
        const container = document.getElementById(containerId);
        if (!container) continue;

        const filteredAnime = animeList.filter(a => a.Status === config.filter);
        
        container.innerHTML = filteredAnime.map(anime => {
            const poster = getPoster(anime.Title, updatesList);
            return createCardHTML(anime, poster);
        }).join('');
    }
}

function getPoster(title, updatesList) {
    const found = updatesList.find(u => 
        u.names?.en?.toLowerCase() === title.toLowerCase() ||
        u.names?.ru?.toLowerCase() === title.toLowerCase()
    );
    return found?.posters?.medium?.url 
        ? `https://anilibria.tv${found.posters.medium.url}`
        : 'placeholder.jpg';
}

function createCardHTML(anime, posterUrl) {
    return `
        <div class="anime-card">
            <img class="anime-poster" 
                 src="${posterUrl}" 
                 alt="${anime.RussianTitle}"
                 loading="lazy"
                 onerror="this.src='fallback-poster.jpg'">
            <div class="anime-info">
                <h3>${anime.RussianTitle}</h3>
                <div class="meta">
                    <span>${anime.ReleasedEpisodes}/${anime.TotalEpisodes} эп.</span>
                    <span>${anime.Genres}</span>
                </div>
            </div>
        </div>
    `;
}

function showError() {
    const containers = document.querySelectorAll('.anime-cards');
    containers.forEach(c => {
        c.innerHTML = `<div class="error">Не удалось загрузить данные</div>`;
    });
}

window.addEventListener('DOMContentLoaded', loadAnime);