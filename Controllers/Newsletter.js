const express = require("express");
const router = express.Router();
const Newsletter = require("../Models/Newsletter");

router.get("/unsubscribe/:email", async (req, res) => {
    const { email } = req.params;

    await Newsletter.deleteOne({ email });
    return res.send("Email unsubscribed from mailing list");
});

router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.json({ success: false, message: "Not a valid email" });

        const letter = await Newsletter.findOne({ email });
        if (letter) {
            return res.json({
                success: false,
                message: "Email already subscribed!"
            });
        }

        await Newsletter.create({
            email
        });

        return res.json({
            success: true,
            message: "Email Subscribed succcessfully!"
        });
    } catch (er) {
        console.log(er);
    }
});

module.exports = router;
