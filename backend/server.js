const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Подключение к БД
const db = require('./db');

// Маршрут для получения данных аниме
app.get('/api/anime', async (req, res) => {
    try {
        const pool = await db.connect();
        const result = await pool.request().query('SELECT * FROM Anime');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));