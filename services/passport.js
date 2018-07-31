const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');


/*
Serializing here means that we are converting the user related information into a cookie based token.
This token is given to the browser which,in turn, make http request with this cookie.
We are serializing the user information, and using the MongoDB Bson Object Id, that is _id, as the cookie that we will
pass to the browser.
*/
passport.serializeUser((user, done) => {
    //User here what we get from the passport middleware.
    //here user.id, is not oAuth id, it is the mongodb _id, kind of a shortcut.
    //first arguement is the error arg, second is user arg.
    done(null, user.id);
});


/*
Deserializing here means that we are converting the serialized information about the user, who requested a service through http, into a 
full blown user information.
As we can see above, we have serialized the user _id as the cookie, we deserialize the same attribute in this method.
*/
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(existing_user => {
            done(null, existing_user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.client_secret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (acceess_token, refresh_token, profile, done) => {

    const existing_user = await User.findOne({ google_id: profile.id });
    if (existing_user) {
        //We already have the record, with the profile id.

        //This will do major things, this tells that we are done with user related operation, please continue the authentication process.
        //This now goes to serializing the user through serializeUser method above.
       return done(null, existing_user);
    }
        //We do not have a user with this id, so save it.
        const user = await new User({ google_id: profile.id }).save()
        done(null, user);
}));