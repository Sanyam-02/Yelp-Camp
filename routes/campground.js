const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsyns = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });

router.route('/')
    .get(catchAsyns(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsyns(campgrounds.createCampground))
    
router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsyns(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground , catchAsyns(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsyns(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsyns(campgrounds.renderEditForm))

module.exports = router;