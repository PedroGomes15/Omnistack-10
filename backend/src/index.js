const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const app = express()

mongoose.connect("mongodb+srv://pedro_gomes:1q2w3e4r5t@cluster0-1dl9v.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(1406)