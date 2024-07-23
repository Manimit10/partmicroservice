const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'QualityAdded') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    console.log('Maaani')
    // to do: if the rating of data.rating is less than 2 === rejected

    await axios.post('http://localhost:4005/events', {
      type: 'QualityModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
        rating: data.content
      }
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
