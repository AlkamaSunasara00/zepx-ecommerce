const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const connection = require("../../connection/connection");
const passport = require("passport"); // ✅ Import passport

require("dotenv").config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google/verify", async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const username = payload.name;
        const img = payload.picture;

        // Check if user exists in the database
        connection.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });

            if (results.length > 0) {
                const user = results[0];

                if (user.status === "inactive") {
                    return res.status(403).json({ error: "Your account is inactive. Please contact support." });
                }

                return res.json(user); // ✅ Return existing active user
            } else {
                // Insert new user if not found
                const sql = "INSERT INTO user (username, email, img, status) VALUES (?, ?, ?, 'active')";
                connection.query(sql, [username, email, img], (err, result) => {
                    if (err) return res.status(500).json({ error: "Database error" });

                    connection.query("SELECT * FROM user WHERE email = ?", [email], (err, newUser) => {
                        if (err) return res.status(500).json({ error: "Database error" });
                        return res.json(newUser[0]);
                    });
                });
            }
        });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
});


// Google Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("http://localhost:3000/"); // Redirect user after login
    }
);

// Logout Route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send("Logout failed.");
        req.session.destroy();
        res.redirect("http://localhost:3000"); // Redirect to home after logout
    });
});
module.exports = router;
