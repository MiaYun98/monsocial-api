const router = require('express').Router();

const {
    getThought, 
    createThought,
    getSingleThought,
    deleteThought,
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought)
module.exports = router;