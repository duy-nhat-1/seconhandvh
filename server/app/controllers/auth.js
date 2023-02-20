const db = require("../models");
const User = db.users;
const Role = db.roles;
const admin = require("../config/firebase.config")
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// exports.signup = async (req, res) => {
//     // Save User to Database
//     try {
//         const user = await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: bcrypt.hashSync(req.body.password, 8),
//         });

//         if (req.body.roles) {
//             const roles = await Role.findAll({
//                 where: {
//                     name: {
//                         [Op.or]: req.body.roles,
//                     },
//                 },
//             });

//             const result = user.setRoles(roles);
//             if (result) res.send({ message: "User registered successfully!" });
//         } else {
//             // user has role = 1
//             const result = user.setRoles([1]);
//             if (result) res.send({ message: "User registered successfully!" });
//         }
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

exports.signin = async (req, res) => {

    if (req.headers.Authorization) {
        return res.status(500).send({ message: "Invalid" })
    }
    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        const email = decodeValue.email;
        console.log(email);
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!user) {
                return res.status(404).send({ message: "User Not found system ." });
            }
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, {
                expiresIn: 86400, // 24 hours
            });

            req.session.token = token;
            return res.status(200).send({
                token: token,
                id: user.id,
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    } catch (error) {
        return res.status(500).send({ success: false, msg: error })
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};