const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { UsersModel, createToken } = require("../models/usersModel")
const { config } = require('../config/secret');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email,
        pass: config.emailPass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);

        const existingUser = await UsersModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }
        const resetToken = createToken(existingUser._id, existingUser.role);

        const mailOptions = {
            from: config.email,
            to: email,
            subject: 'Password Reset',
            html: `<p>Click the following link to reset your password: <a href="http://localhost:3001/reset-password/${resetToken}">Reset Password</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
