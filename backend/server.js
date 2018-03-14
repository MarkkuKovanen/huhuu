const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const models = require('./models.js');

app.post('/api/user', (req, res, next) => {
    let user = new models.User(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        res.json(user);
    });
});

const server = app.listen(config.port, () => {
    console.log("Server running at port " + server.address().port);
});

