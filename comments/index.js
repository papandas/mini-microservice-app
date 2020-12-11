const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

//console.log('-')

app.post('/events', async (req, res) => {
   
    const {type, data} = req.body;

    switch(type){
        case "CommentModerated":
            const {postId, id, status, content} = data;
            const comments = commentsByPostId[postId];
            const comment = comments.find(comment => {
                return comment.id === id;
            })
            comment.status = status
            await axios.post(`http://localhost:4005/events`,{
                type:'CommentUpdated',
                data: {
                    id, postId, content, status
                }
            })
            break;

        default:
            console.log(req.body)
            break;
    }

    res.send({});
})

app.get('/posts/:id/comments', (req, res) => {
    const pid = req.params.id;
    res.send(commentsByPostId[pid] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const cid = randomBytes(4).toString('hex');
    const pid = req.params.id;
    const { content } = req.body;

    const comments = commentsByPostId[pid] || [];
    comments.push({id:cid, content: content, status: 'pending'})

    commentsByPostId[pid] = comments;

    await axios.post('http://localhost:4005/events', {
        type:'CommentCreated',
        data: {
            id: cid,
            content,
            postId: pid,
            status: 'pending'
        }
    })

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listenning on 4001 - Comments Services')
})