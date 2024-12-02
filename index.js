const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let users = [
    {
        username: 'john',
        content : 'hello world'
    },
    {
        username: 'jane',
        content : 'hello world'
    },
    {
        username: 'joe',
        content : 'hello world'
    },{
        username: 'jane',
        content : 'hello world'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
