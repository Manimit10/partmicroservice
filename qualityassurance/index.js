const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get('/parts/:id/quality', (req, res) =>{
    res.send(commentsByPostId[req.params.id] || [])
});

app.post('/parts/:id/quality', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex');
    const { content, rating } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, rating, status: "pending"})

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: "QualityAdded",
        data: {
            id: commentId,
            content,
            rating,
            postId: req.params.id,
            status: "pending"
        }
    })
    res.status(201).send(comments)
});
app.post('/events', async (req, res) => {
    console.log('Event Received: ', req.body.type);

    const { type, data } = req.body;

    if (type === "QualityModerated"){
        const {postId, id, status, content, rating } = data;
        const comments = commentsByPostId[postId]

        const comment = comments.find( comment => {
            return comment.id === id;
        });
        comment.status = status
        await axios.post("http://localhost:4005/events", {
            type: "QualityUpdated",
            data: {
              id,
              status,
              postId,
              content,
              rating
            },
          });
    }
    res.send({})
})

app.listen(4001, ()=>{
    console.log('listening to 4001')
})