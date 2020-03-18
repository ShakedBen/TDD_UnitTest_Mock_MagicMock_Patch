import {DovMusic} from './DovMusic'

const express = require('express')
const app     = express()
const path    = require('path')

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/coverage', function (req, res) {
    res.sendFile(path.join(__dirname, '../coverage/index.html'))
})

app.get('/DovMusic.js.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../coverage/DovMusic.js.html'))
})

app.use(express.static(__dirname + '../coverage'))


app.listen(process.env.PORT || 4000, function () {
    console.log('Server Running')
})
