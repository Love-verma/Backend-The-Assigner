const express = require('express');
const { enrollUser, verifyOTP } = require('../controllers/enrollController');


const router = express.Router();

router.post('/enroll', enrollUser);
router.post('/verify-otp', verifyOTP);

module.exports = router;
