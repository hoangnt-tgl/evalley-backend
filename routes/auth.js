var express = require("express");
var router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const OAuth2Client = require('google-auth-library');
const { verify } = require("jsonwebtoken");

passport.use(
    new GoogleStrategy(
        {
            clientID: "796723683541-0gc7s6a3hbfu8eg5ubg7tg50v5amclfj.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: '/auth/google/callback'
        },
        accessToken => {
            const client = new OAuth2Client(accessToken)
            async function verify(){
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                    // Or, if multiple clients access the backend:
                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                    
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
            }
            verify().catch(console.error)
            
        }
    )
);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
router.get('/google/callback', passport.authenticate('google'));




module.exports = router;