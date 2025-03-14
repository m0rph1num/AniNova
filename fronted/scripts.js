async function loadAnime() {
    const response = await fetch('http://localhost:3000/api/anime');
    const data = await response.json();
    renderCards(data, 'new-cards');
}

function renderCards(animeList, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = animeList.map(anime => `
        <div class="card">
            <img src="${anime.PosterURL}">
            <h3>${anime.Title}</h3>
            <p>Эпизодов: ${anime.ReleasedEpisodes}/${anime.TotalEpisodes}</p>
        </div>
    `).join('');
}

loadAnime();