const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

/**
 * @swagger
 * /auth/forget-password:
 *  post:
 *   tags:
 *   - Forget Password
 *   summary: Forget Password
 *   description: Forget Password
 *   requestBody:
 *    content:
 *      application/json:
 *       properties:
 *        email:
 *        type: string
 *       example:
 *        email: "jhon@gmail.com"
 *   responses:
 *    200:
 *     description: Email sent
*/
exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'Reset Password',
      html: `
        <h1>Reset your password</h1>
        <h2>Please click on following link for reset your password</h2>
        <a href="${process.env.URL}/auth/reset-password/${token}">Reset Password</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ success: true, data: 'Email sent' });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /auth/reset-password/{resetToken}:
 *   post:
 *     tags:
 *       - Password Reset
 *     summary: Reset user password
 *     description: This can only be done by the user who requested a password reset.
 *     operationId: resetPassword
 *     parameters:
 *       - name: resetToken
 *         in: path
 *         description: JWT token for the user
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: string
 *       '400':
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '500':
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
*/
exports.resetPassword = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.params.resetToken, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user.password = req.body.password;
    await user.save();

    res.status(200).json({ success: true, data: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
