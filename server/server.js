import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3000;

app.get('/api/tickets', async (req, res) => {
    try {
        const apiUrl = 'https://api.travelpayouts.com/aviasales/v3/prices_for_dates';
        const requestData = req.query; // Получаем параметры из URL запроса
        const url = new URL(apiUrl);
        Object.keys(requestData).forEach(key => url.searchParams.append(key, requestData[key])); // Добавляем параметры к URL
        const response = await fetch(url.toString());
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/cities', async (req, res) => {
    try {
        const apiUrl = 'https://api.travelpayouts.com/data/ru/cities.json?_gl=1*10qae8k*_ga*NTA1NjQ0NzQ5LjE3MDcyOTE4NjE.*_ga_1WLL0NEBEH*MTcwNzI5Njc1MC4yLjEuMTcwNzI5NjgzMS41OS4wLjA.';
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/airports', async (req, res) => {
    try {
        const apiUrl = 'https://api.travelpayouts.com/data/ru/airports.json?_gl=1*1no7amh*_ga*NTA1NjQ0NzQ5LjE3MDcyOTE4NjE.*_ga_1WLL0NEBEH*MTcwNzMzMDU4MC42LjEuMTcwNzMzMDg1OC42MC4wLjA.';
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/airlines', async (req, res) => {
    try {
        const apiUrl = 'https://api.travelpayouts.com/data/ru/airlines.json?_gl=1*y8b55z*_ga*NTA1NjQ0NzQ5LjE3MDcyOTE4NjE.*_ga_1WLL0NEBEH*MTcwNzMzMDU4MC42LjEuMTcwNzMzMDg1OC42MC4wLjA.';
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

