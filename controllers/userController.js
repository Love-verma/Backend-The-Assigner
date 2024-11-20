const User = require('../models/userModel');

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, currentLocation, city, state, education } = req.body;
    const profilePic = req.file ? req.file.path : undefined;

    // Create user
    const user = new User({
      name,
      email,
      phone,
      currentLocation,
      city,
      state,
      education: education ? JSON.parse(education) : [], // Parse education if provided
      profilePic,
    });

    // Save to database
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.profilePic = req.file.path;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};