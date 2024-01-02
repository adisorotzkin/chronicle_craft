const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { config } = require("../config/secret");
const bcrypt = require('bcrypt');
const {UsersModel} = require('../models/usersModel');

const verifyResetToken = (token, secret) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

router.post('/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const decoded = await verifyResetToken(token, config.tokenSecret);
        if (decoded.exp < Date.now() / 1000) {
            return res.status(400).json({ message: 'Token expired. Please request a new reset email.' });
        }
        const userId = decoded._id;
        console.log(decoded);
        console.log(userId); // Assuming your token payload has the user ID as 'sub'

        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Use findOneAndUpdate to update the user's password
        const updatedUser = await UsersModel.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hashedPassword } },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }


        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;