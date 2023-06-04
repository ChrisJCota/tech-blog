const express = require("express");
const router = express.Router();
const { User, Blog, Comments } = require("../../models");

router.get("/", (req, res) => {
    Comments.findAll({ include: [User, Blog] })
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.get("/:id", (req, res) => {
    Comments.findByPk(req.params.id, { include: [User, Blog] })
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comments.create({
            body: req.body.body,
            userId: req.session.user.id,
            blogId: req.body.blogId
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login!" })
    }
    Comments.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedComment => {
        res.json(updatedComment);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comments.destroy({
            where: {
                id: req.params.id,

            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;