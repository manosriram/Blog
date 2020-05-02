const express = require("express");
const router = express.Router();
const Admin = require("../Models/Admin");

router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.json({scs: true});
});


router.get('/checkStat', (req, res) => {
    if (req.session.user)
        return res.status(200).json({scs: true, user: req.session.user});
    else
        return res.status(404).json({scs: false});
});

router.post("/enterAdmin", async (req, res) => {
    const {email, password} = req.body.data;

    try {
        const adm = await Admin.findOne({email});

        if (!adm) {
            const adm = new Admin({
                email,
                password
            });
            adm.save();
            req.session.user = adm;
        } else {
            if (password !== adm.password)
                return res.json({scs:false, msg: "Incorrect Password."});
            if (req.session.user)
                return res.json({scs: false, msg: "Already Logged-In"});

            req.session.user = adm;
            return res.json({scs: true, msg: "Logged-IN"});
        }
    } catch(er) {
        return res.json({scs: false, msg:"Error Occured"});
    }

});

router.get('/', (req, res) => {
    return res.json({hit: true});
});


module.exports = router;
