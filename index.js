const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const users = [
    { username: 'alice', content: 'Greetings from Alice!' },
    { username: 'bob', content: 'Hey there, I\'m Bob!' },
    { username: 'charlie', content: 'Hello from Charlie!' },
    { username: 'diana', content: 'Hi, I\'m Diana!' }
];

app.get('/', (req, res) => {
    res.send('Welcome to our app!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
