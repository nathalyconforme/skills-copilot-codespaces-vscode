// Create web server
// 1. Create web server
// 2. Create router
// 3. Create route
// 4. Create route handler
// 5. Listen for incoming requests
// 6. Handle requests with route handler

// 1. Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// 2. Create router
// 3. Create route
// 4. Create route handler
app.use(bodyParser.json());
app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Event Received:', type);

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      },
    });
  }
  // 5. Listen for incoming requests
  // 6. Handle requests with route handler
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});