const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//const cors = require('cors');

const app = express();
app.use(bodyParser.json());
//app.use(cors());

app.post('/events', async (req, res) => {

    const {type, data} = req.body;

    switch(type){

        case "CommentCreated":
            const status = data.content.includes('orange') ? 'rejected':'approved';

            await axios.post(`http://localhost:4005/events`,{
                type:'CommentModerated',
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


app.listen(4003, () => {
    console.log('Listenning on 4003 - Moderation Services')
})