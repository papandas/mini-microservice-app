const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//const cors = require('cors');

const PORT = process.env.PORT || 4005;
const APPNAME = process.env.APPNAME || 'event-bus';
const POSTSURL = process.env.POSTSURL || 'http://localhost:4000';
const COMMENTSURL = process.env.COMMENTSURL || 'http://localhost:4001';
const QUERYURL = process.env.QUERYURL || 'http://localhost:4002';
const MODERATIONURL = process.env.MODERATIONURL || 'http://localhost:4003';

const events = [];

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post(`${POSTSURL}/events`, event);
    axios.post(`${COMMENTSURL}/events`, event);
    axios.post(`${QUERYURL}/events`, event);
    axios.post(`${MODERATIONURL}/events`, event);

    res.send({ status: 'OK' });
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(PORT, () => {
    console.log(`Listenning on ${PORT} - ${APPNAME} services`)
})