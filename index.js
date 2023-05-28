const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const apiKey = '********************';
const endpoint = 'https://api.cognitive.microsofttranslator.com/';
const region = 'northeurope';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.post('/translate', async (req, res)=>{
    const {text, from, to} = req.body;
    const translateUrl = `${endpoint}/translate?api-version=3.0&to=${to}&from=${from}`;

    const config = {
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Ocp-Apim-Subscription-Region': region,
            'Content-Type': 'application/json',
            'Accept-Language': to
        }
    }

    const data = [
        {
            text
        }
    ];

    try {
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        const response = await axios.post(translateUrl, data, config);
        const translation = response.data[0].translations[0].text;

        res.json({ translation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during translation.' });
    }
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});