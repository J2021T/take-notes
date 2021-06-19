const router = require('express').Router();
const { notes } = require('../../data/db');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, notes));
});

module.exports = router;