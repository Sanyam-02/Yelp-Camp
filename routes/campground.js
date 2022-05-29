const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsyns = require('../utlis/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')

router.get('/',catchAsyns(campgrounds.index))

router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.post('/',isLoggedIn ,validateCampground, catchAsyns(campgrounds.createCampground))
 
router.get('/:id', catchAsyns(campgrounds.showCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsyns(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateCampground , catchAsyns(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, catchAsyns(campgrounds.deleteCampground))

module.exports = router;