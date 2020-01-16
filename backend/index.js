const express = require('express');

const app = express()

app.get('/', (request, response) => {
    return response.json({ message: 'Hello Piroca' })
})

app.listen(1406)