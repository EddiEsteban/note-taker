const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 8080

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//return notes from db
app.get('/api/notes', function(req, res){
    console.log(JSON.parse(fs.readFileSync('./db/db.json')))
    return JSON.parse(fs.readFileSync('./db/db.json'))
})

//save notes
app.post('/api/notes', function(req, res){
    let note = req.note
    let db = JSON.parse(fs.readFileSync('./db/db.json'))
    db.push(note)
    fs.writeFileSync('db/db.json', JSON.stringify(db))
})

//delete note of specific id
app.delete('/api/notes/:id', function(req, res){
    return fs.readFileSync('db/db.json')
})

// listen for client requests
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });