const express = require("express");
const router = express.Router();
const Counter = require("../Models/Counter");

router.get("/countapi", async (req, res) => {
    const CT = await Counter.findOne({"code": "GBL"});
    return res.json(CT.ctr);
});

module.exports = router;
