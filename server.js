const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB =
  'mongodb+srv://USER:PASS@cluster0.s0qzepj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
