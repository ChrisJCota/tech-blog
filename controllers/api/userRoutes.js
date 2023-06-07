const express = require("express");
const router = express.Router();
const { User, Blog, Comments } = require("../../models/");
const bcrypt = require("bcrypt");
const withAuth = require('../../utils/auth.js');


router.get("/", (req, res) => {
    User.findAll({ include: [Blog, Comments] })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, { include: [Blog, Comments] })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newUser = await User.create({
            id: newUser.id,
            name: newUser.name
        });

        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", (req, res) => {

    User.findOne({
        where: {
            name: req.body.name
        }
    }).then(correctUser => {
        if (!correctUser) {
            return res.status(400).json({ msg: "wrong login credentials" })
        }

        if (bcrypt.compareSync(req.body.password, correctUser.password)) {
            req.session.user = {
                id: correctUser.id,
                name: correctUser.name
            }
            return res.json(correctUser)
        } else {
            return res.status(400).json({ msg: "wrong login credentials" })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
});

router.put("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login!" })
    }
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updateUser => {
        res.json(updateUser);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,

            },
        });

        if (!userData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;