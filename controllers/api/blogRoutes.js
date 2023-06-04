const express = require("express");
const router = express.Router();
const { User, Blog, Comments } = require("../../models");
const withAuth = require('../../utils/auth.js');

router.get("/", (req, res) => {
    Blog.findAll({ include: [User, Comment] })
        .then(blogs => {
            res.json(blogs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id, { include: [User, Comment] })
        .then(blog => {
            res.json(blog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login!" })
    }
    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedBlog => {
        res.json(updatedBlog);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,

            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;