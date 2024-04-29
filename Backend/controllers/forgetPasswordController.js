const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

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
    // console.log('Email: ', process.env.EMAIL);
    // console.log('Email Password: ', process.env.EMAIL_PASSWORD);

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'Reset Password on ModLang Project',
      html: `
        <h1>Reset your password</h1>
        <h2>Please click on following link for reset your password</h2>
        <a href="${process.env.FRONT_URL}/auth/reset/${token}">Reset Password</a>
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

exports.resetPassword = async (req, res) => {
  try {
    const decodedToken = jwt.verify(
      req.params.resetToken,
      process.env.JWT_SECRET,
    );
    if (!decodedToken) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await User.findByIdAndUpdate(
      decodedToken.userId,
      {
        password: hashedPassword,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res
      .status(200)
      .json({ success: true, data: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
