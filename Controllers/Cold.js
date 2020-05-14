const express = require("express");
const router = express.Router();
const Cold = require("../Models/ColdStorage");

router.delete("/delete-link", async (req, res) => {
    const {postID} = req.body;

    try {
        await Cold.deleteOne({_id: postID});
        return res.json({scs: true, msg: "Link Deleted!"});
    } catch (er) {
        return res.json({scs: false, msg: "Error Occured!"});
    }
});

router.post("/get-a-storage", async (req, res) => {
    const {storageID} = req.body;
    try {
        const store = await Cold.findOne({_id: storageID});
        return res.json({scs: true, storage: store});
    } catch (er) {
    return res.json({scs: false, msg: 'Some error occured.'});
    }
});

router.post("/add-into-store", async (req, res) => {
    console.log(req.body);
    const { title, url } = req.body;

    if (!title || !url)
        return res.json({ scs: false, msg: "Fill all fields." });

    try {
        const newCold = new Cold({
            title,
            url
        });
        newCold.save();
        return res.json({ scs: true, msg: "Added into Storage!" });
    } catch (er) {
        return res.json({ scs: false, msg: "Error Occured" });
    }
});

router.get("/get-storages", async (req, res) => {
    const allStorages = await Cold.find({}).sort({addedOn: -1});

    return res.json(allStorages);
});

module.exports = router;
