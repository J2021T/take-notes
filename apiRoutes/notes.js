const fs = require('fs');
const path = require('path');
const router = require('express').Router();


router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/notes.json'));
});

router.post('/notes', (req, res) => {
    let saved = JSON.parse(fs.readFileSync('./data/notes.json', 'utf8'));
    let newNote = req.body;
    newNote.id = saved.length;
    console.log(newNote);
    saved.push(newNote);
    
    fs.writeFile('./data/notes.json', JSON.stringify(saved), (err) => {
        if (err) throw err;
        console.log('The file has been updated');
        res.json(saved);
    });
});

module.exports = router;