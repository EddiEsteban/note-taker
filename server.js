const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 8080

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//return notes from db
app.get('/api/notes', function(req, res){
    const noteList = JSON.parse(fs.readFileSync('./db/db.json'))
    console.log(noteList)
    res.send(noteList)
})

//save notes
app.post('/api/notes', function(req, res){
    let note = req.body
    let db = JSON.parse(fs.readFileSync('./db/db.json'))
    db.push(note)
    fs.writeFileSync('db/db.json', JSON.stringify(db))
    res.send(db)
})

//delete note of specific id
app.delete('/api/notes/:id', function(req, res){
    return fs.readFileSync('db/db.json')
})

// listen for client requests
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });