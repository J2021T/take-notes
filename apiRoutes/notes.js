const fs = require('fs');
const router = require('express').Router();
const { notes } = require('../data/notes');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, notes));
});

router.post('/notes', (req, res) => {
    let saved = JSON.parse(fs.readFileSync(notes, 'utf-8'));
});

module.exports = router;