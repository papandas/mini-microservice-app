const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 4000;
const APPNAME = process.env.APPNAME || 'posts';
const EVENTBUSURL = process.env.EVENTBUSURL || 'http://localhost:4005';

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};

app.post('/events', (req, res) => {

    switch (req.body.type) {
        default: console.log(req.body)
        break;
    }

    res.send({});
})

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async(req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title
    }

    await axios.post(`${EVENTBUSURL}/events`, {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send(posts[id]);
});

app.listen(PORT, () => {
    console.log(`Listenning on ${PORT} - ${APPNAME} services`)
})