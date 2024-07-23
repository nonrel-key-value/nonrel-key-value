const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.static('styles'));
app.use(express.static('scripts'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

// Serve home.html as the initial page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(5000, () => console.log(`Server is Running on port ${5000}`));
