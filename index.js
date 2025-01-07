const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    { id: 1, username: 'alice', title: 'Greetings from Alice!' },
    { id: 2, username: 'bob', title: 'Hey there, I am Bob!' },
    { id: 3, username: 'charlie', title: 'Hello from Charlie!' },
    { id: 4, username: 'diana', title: 'Hi, I am Diana!' }
];

app.get('/', (req, res) => {
    res.send('Welcome to our app!');
});

app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

app.post('/posts', (req, res) => {
    const { username, title } = req.body;
    const newPost = { id: posts.length + 1, username, title };
    posts.push(newPost);
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === parseInt(id));
    if (post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/delete', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(p => p.id !== parseInt(id));
    res.redirect('/posts');
});

app.post('/posts/:id/update', (req, res) => {
    const { id } = req.params;
    const { username, title } = req.body;
    let post = posts.find(p => p.id === parseInt(id));
    if (post) {
        post.username = username;
        post.title = title;
        res.redirect('/posts');
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
