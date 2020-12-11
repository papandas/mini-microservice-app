const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//const cors = require('cors');

const PORT = process.env.PORT || 4003;
const APPNAME = process.env.APPNAME || 'moderation';
const EVENTBUSURL = process.env.EVENTBUSURL || 'http://localhost:4005';

const app = express();
app.use(bodyParser.json());
//app.use(cors());

app.post('/events', async(req, res) => {

    const { type, data } = req.body;

    switch (type) {

        case "CommentCreated":
            const status = data.content.includes('orange') ? 'rejected' : 'approved';

            await axios.post(`${EVENTBUSURL}/events`, {
                type: 'CommentModerated',
                data: {
                    id: data.id,
                    content: data.content,
                    postId: data.postId,
                    status
                }
            })

            break;

        default:
            console.log(req.body)
            break;
    }

    res.send({});
});


app.listen(PORT, () => {
    console.log(`Listenning on ${PORT} - ${APPNAME} services`)
})