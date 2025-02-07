const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    { id: 1, username: 'alice', title: 'Greetings from Alice!' },
    { id: 2, username: 'bob', title: 'Hey there, I am Bob!' },
    { id: 3, username: 'charlie', title: 'Hello from Charlie!' },
    { id: 4, username: 'diana', title: 'Hi, I am Diana!' },
    { id: 5, username: 'eve', title: 'Hello from Eve!' }
];


function validatePost(username, title) {
    if (!username || typeof username !== 'string' || username.length < 3) {
        return 'Username must be a string with at least 3 characters';
    }
    if (!title || typeof title !== 'string' || title.length < 5) {
        return 'Title must be a string with at least 5 characters';
    }
    return null;
}

function generateUniqueId() {
    return Math.max(...posts.map(p => p.id), 0) + 1;
}

app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new', { error: null });
});

app.post('/posts', (req, res) => {
    const { username, title } = req.body;
    const validationError = validatePost(username, title);
    if (validationError) {
        return res.render('new', { error: validationError });
    }
    const newPost = { id: generateUniqueId(), username, title };
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

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== parseInt(id));
    if (posts.length < initialLength) {
        res.status(200).send('Post deleted successfully');
    } else {
        res.status(404).send('Post not found');
    }
});

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { username, title } = req.body;
    const validationError = validatePost(username, title);
    if (validationError) {
        return res.status(400).send(validationError);
    }
    let post = posts.find(p => p.id === parseInt(id));
    if (post) {
        post.username = username;
        post.title = title;
        res.status(200).send('Post updated successfully');
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

