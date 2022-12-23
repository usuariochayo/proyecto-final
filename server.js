const express = require('express')
const clientesRouter = require('./routes/clientes')
const ticketRouter = require('./routes/ticket')
const personalRouter = require('./routes/personal')
const cors = require("cors")

class Server{
    constructor(){
        this.app = express()
        this.paths = {
            clientes: "/api/v1/clientes",
            ticket: "/api/v1/ticket",
            personal: "/api/v1/personal"

        }

        this.middlewares()
        this.routes()
    
    }

    routes(){
        this.app.use(this.paths.clientes, clientesRouter)
        this.app.use(this.paths.ticket, ticketRouter)
        this.app.use(this.paths.personal, personalRouter)
    }

    middlewares(){
        this.app.use(cors())//permite solicitudes de origen cruzado
        this.app.use(express.json())//habilita la lectura de contenido en formato json
    }

    listen(){
        this.app.listen(process.env.PORT, ()=> {
            console.log(process.env.PORT);
        })
    }
}

module.exports = Server