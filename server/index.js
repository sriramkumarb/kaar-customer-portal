const express = require('express')
const app = express()
const port = 3000

const { mongoose } = require('./db/mongoose');


app.use('/', require('./routes/user'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})