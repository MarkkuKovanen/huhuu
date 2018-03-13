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
            //Tuotannossa pitää miettiä kannattaako virhettä kerota ulos
            return;
        }
        res.json(user);
    });
});

const server = app.listen(1234, () => {
    console.log("Server running at port " + server.address().port);
});

