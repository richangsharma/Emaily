const express = require('express');
const mongoose = require('mongoose');
const cookie_session = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();

mongoose.connect(keys.mongodb_remote_uri);

app.use(
    cookie_session({
        // 30 Days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookie_encryption_key]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth_routes')(app);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening at port: ', PORT);
});