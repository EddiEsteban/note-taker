const express = require('express')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

//return notes from db
app.get('/api/notes', function(req, res){
    const noteList = JSON.parse(fs.readFileSync('./db/db.json'))
    // console.log(`[get] ${JSON.stringify(noteList)}`)
    res.send(noteList)
})

//save notes
app.post('/api/notes', function(req, res){
    let note = req.body
    let noteList = JSON.parse(fs.readFileSync('./db/db.json'))
    noteList.push(note)
    noteList.forEach((item, index, arr)=>{
        arr[index] = {...item, id:index+1}
    })
    // console.log(`[post] ${JSON.stringify(noteList)}`)
    fs.writeFileSync('db/db.json', JSON.stringify(noteList))
    res.send(noteList)
})

//delete note of specific id
app.delete('/api/notes/:id', function(req, res){
    const id = req.params.id
    const noteList = JSON.parse(fs.readFileSync('./db/db.json'))
    noteList.splice(id,1)
    noteList.forEach((item, index, arr)=>{
        arr[index] = {...item, id:index+1}
    })
    // console.log(`[delete] ${JSON.stringify(noteList)}`)
    fs.writeFileSync('db/db.json', JSON.stringify(noteList))
    res.send(noteList)
})

// listen for client requests
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });