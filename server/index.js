const express = require('express')
const app = express()
const port = 3000

app.use('/', require('./routes/user'));
app.use('/', require('./routes/vendor'));
app.use('/', require('./routes/employee'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})