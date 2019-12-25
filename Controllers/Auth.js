const express = require("express");
const router = express.Router();
const Admin = require("../Models/Admin");

router.post("/enterAdmin", async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body.data;

    try {
        const adm = await Admin.findOne({email}).then().catch();

        if (!adm) {
            const adm = new Admin({
                email,
                password
            });
            adm.save();
            req.session.user = adm;
        } else {
            if (
            req.session.user = adm;
        }
    } catch(er) {
        return res.json({scs: false});
    }

    return res.json({scs: true});
});

router.get('/', (req, res) => {
    return res.json({hit: true});
});

module.exports = router;
