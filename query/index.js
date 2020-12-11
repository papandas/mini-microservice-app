const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}

const handleEvent = (type, data) => {
    const id = data.id
    
    switch(type){
        case "PostCreated":
            const { title } = data;
            posts[id] = {id, title, comments: []};
            break;

        case "CommentCreated":
            const {content, postId, status} = data;
            const post = posts[postId];
            post.comments.push({id, content, status});
            break;

        case "CommentUpdated":
            const _post = posts[data.postId];
            const comment = _post.comments.find(comment =>{
                return comment.id === id
            })
            comment.content = data.content;
            comment.status = data.status;
            break;

        default:
            //console.log(req.body)
            break;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {

    const {type, data} = req.body;

    handleEvent(type, data);

    //console.log(posts)

    res.send({});
})

app.listen(4002, async () => {
    console.log('Listenning on 4002 - Query Services')

    const res = await axios.get('http://localhost:4005/events');

    for(let event of res.data){
        console.log('Processing event:', event.type)
        handleEvent(event.type, event.data)
    }
})