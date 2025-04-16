const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const connection = require("../../connection/connection");
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4800/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            const username = profile.displayName;
            const img = profile.photos[0].value;

            connection.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
                if (err) return done(err, null);

                if (results.length > 0) {
                    return done(null, results[0]); // User exists, return user
                } else {
                    // Insert new Google user (No password required)
                    const sql = "INSERT INTO user (username, email, img, status) VALUES (?, ?, ?, ?)";
                    const values = [username, email, img, "active"];

                    connection.query(sql, values, (err, result) => {
                        if (err) return done(err, null);

                        connection.query("SELECT * FROM user WHERE email = ?", [email], (err, newUser) => {
                            if (err) return done(err, null);
                            return done(null, newUser[0]); // Return the new user
                        });
                    });
                }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
    connection.query("SELECT * FROM user WHERE user_id = ?", [id], (err, results) => {
        if (err) return done(err, null);
        return done(null, results[0]);
    });
});
