const express = require("express");

const Note = require("../models/note.js");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.post("/create", auth, async(req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id,
    });
    try {
        await note.save();
        res.status(201).send({ note, message: "Note Saved" });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/getnotes", auth, async (req, res) => {
    try {
        await req.user.populate("notes");

        console.log(req.user.notes);

        res.send(req.user.notes);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id });
        if (!note) {
            return res.status(404).send();
        }
        res.send(note);
    } catch (e) {
        res.status(500).send();
    }
});

router.put("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!note) {
            return res.status(404).send();
        }

        res.send({ note, message: "Note updated" });
    } catch (e) {
        res.status(500).send();
    }
});


router.delete("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id });

        if (!note) {
            return res.status(404).send();
        }
        res.send({ message: "Note was deleted" });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;