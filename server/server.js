const express = require('express')
require('dotenv').config();
const cors = require("cors");
const app = express();
const db = require('./app/models')
db.sequelize.sync();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", 'GET', 'PUT', 'DELETE']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/', (req, res) => { res.send('sever on...') })
const port = process.env.PORT || 8888

const listener = app.listen(port, () => {
    console.log(`Server is running in port ${listener.address().port}`);
})
require("./app/routes/auth.routes")(app)
