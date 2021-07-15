const express = require('express')
const app = express()
const port = 3000

app.use('/cus', require('./routes/user'));
app.use('/ven', require('./routes/vendor'));
app.use('/emp', require('./routes/employee'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})