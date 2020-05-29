const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./config/keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected successful")
})

mongoose.connection.on('error', (err) => {
    console.log("connected error", err)
})

require('./model/user')
require('./model/post')

app.use(express.json())
app.use(require('./routes/post'))
app.use(require('./routes/auth'))
app.use(require('./routes/user'))

if (process.env.NODE_ENV === "production") {
    console.log("Production env")
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})