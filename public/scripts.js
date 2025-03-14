const API_URL = 'http://localhost:3000/api/anime';
const ANILIBRIA_API = 'https://cors-anywhere.herokuapp.com/https://api.anilibria.tv/v2';

async function loadAnime() {
    try {
        const animeResponse = await fetch(API_URL);
        if (!animeResponse.ok) throw new Error('Ошибка загрузки данных с сервера');
        const animeData = await animeResponse.json();

        const updatesResponse = await fetch(`${ANILIBRIA_API}/getUpdates`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        if (!updatesResponse.ok) throw new Error('Ошибка загрузки данных с Anilibria');
        const updatesData = await updatesResponse.json();

        renderCards(animeData, updatesData.list);
    } catch (error) {
        console.error('Ошибка:', error);
        showError(error.message);
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
        
        if (filteredAnime.length === 0) {
            container.innerHTML = `<div class="error">Нет данных для отображения</div>`;
            continue;
        }

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

function showError(message) {
    const containers = document.querySelectorAll('.anime-cards');
    containers.forEach(c => {
        c.innerHTML = `<div class="error">${message}</div>`;
    });
}

window.addEventListener('DOMContentLoaded', loadAnime);