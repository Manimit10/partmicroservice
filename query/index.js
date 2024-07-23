const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "InventoryAdded") {
    const { id, title, manufacturer, quantity } = data;

    posts[id] = { id, title, manufacturer, quantity, Quality: [] };
  }

  if (type === "QualityAdded") {
    const { id, content, postId, rating, status } = data;

    const post = posts[postId];
    post.Quality.push({ id, content, rating, status });
  }

  if (type === "QualityUpdated") {
    const { id, content, postId, rating, status } = data;

    const post = posts[postId];
    console.log(post.Quality)
    const comment = post.Quality.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
    comment.rating = rating;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
