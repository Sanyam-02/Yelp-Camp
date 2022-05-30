const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsyns = require('../utlis/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.route('/')
    .get(catchAsyns(campgrounds.index))
    // .post(isLoggedIn ,validateCampground, catchAsyns(campgrounds.createCampground))
    .post(upload.array('image'), (req,res)=>{
        console.log(req.body, req.files);
        res.send('It Worked!!');
    })
    
router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsyns(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground , catchAsyns(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsyns(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsyns(campgrounds.renderEditForm))

module.exports = router;