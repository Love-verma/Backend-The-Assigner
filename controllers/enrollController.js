const enroll = require('../models/enrollModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email
const sendEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Email Verification',
    text: `Your OTP is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};


const enrollUser = async (req, res) => {
  const { name, email, phone, message, services } = req.body;

  try {
    // Check if user already exists
    const existingUser = await enroll.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate OTP and set expiry
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    // Create new user entry
    const newUser = new enroll({
      name,
      email,
      phone,
      message,
      services,
      otp,
      otpExpiry,
    });

    await newUser.save();

    // Send OTP to email
    await sendEmail(email, otp);

    res.status(200).json({ message: 'Enroll successful. OTP sent to email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handle OTP verification
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await enroll.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if OTP is expired
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { enrollUser, verifyOTP };
