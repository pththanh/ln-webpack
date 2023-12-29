const express =  require('express');
const path = require('path')
const fs = require('fs')




const PORT = 3001; 
const app = express()

app.get('/', function(req, res) {
    const pathFromFile = path.resolve(__dirname, "../../dist/home.html")
    const contentFromHtmlFile = fs.readFileSync(pathFromFile, 'utf-8')
    res.send(contentFromHtmlFile)
})

app.get('/about/', function(req, res) {
    const pathFromFile = path.resolve(__dirname, "../../dist/about.html")
    const contentFromHtmlFile = fs.readFileSync(pathFromFile, 'utf-8')
    res.send(contentFromHtmlFile)
})



app.use('/', express.static(path.resolve(__dirname, '../../dist')))


app.listen(PORT, function(){
    console.log(`Application is running on http://localhost:${PORT}`)
})