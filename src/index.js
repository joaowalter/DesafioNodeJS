const express = require('express')
const server = express()

server.use(express.urlencoded({ extended: true}))
const routes = require("./routes")

server.use(routes)

server.listen(3333, () => {
    console.log('✔ Back-end start!')
});