const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Подключение CORS
app.use(cors());

// Подключение статических файлов
app.use(express.static('public'));

// Маршрут для получения данных аниме
app.get('/api/anime', (req, res) => {
    const animeData = [
        {
            "Title": "Attack on Titan",
            "RussianTitle": "Атака титанов",
            "Status": "Новое",
            "TotalEpisodes": 24,
            "ReleasedEpisodes": 12,
            "Genres": "Экшен, Драма"
        },
        {
            "Title": "My Hero Academia",
            "RussianTitle": "Моя геройская академия",
            "Status": "Вышедшее",
            "TotalEpisodes": 113,
            "ReleasedEpisodes": 113,
            "Genres": "Экшен, Школа"
        },
        {
            "Title": "Demon Slayer",
            "RussianTitle": "Клинок, рассекающий демонов",
            "Status": "Анонсированное",
            "TotalEpisodes": 26,
            "ReleasedEpisodes": 0,
            "Genres": "Экшен, Фэнтези"
        }
    ];
    res.json(animeData);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});