const express = require('express')
const multer = require('multer')
const userController = require('../controllers/userController');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads');
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

//routes

router.post('/',upload.single('profilePic'), userController.createUser);
router.get('/',userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', upload.single('profilePic'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;