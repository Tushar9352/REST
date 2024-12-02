const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const posts = [
    { username: 'alice', title: 'Greetings from Alice!' },
    { username: 'bob', title: 'Hey there, I am Bob!' },
    { username: 'charlie', title: 'Hello from Charlie!' },
    { username: 'diana', title: 'Hi, I am Diana!' }
];

app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
