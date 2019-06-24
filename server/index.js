const express = require('express')
const next = require('next')
const routes = require('../routes')

const app = next({dev: process.env.NODE_ENV !== "production"})
const handler = routes.getRequestHandler(app)

app.prepare()
    .then(() => {
        const server = express()

        server.get("*", (req, res) => {
            return handler(req, res)
        })

        server.use(handler).listen(3000, (err) => {
            if(err) throw err
            console.log("app ready on port 3000: ")
        })
    })
    .catch(e => {
        console.error(e.stack)
        process.exit(1)
    })