import express from 'express'
import morgan from 'morgan'
import expressWs from 'express-ws'
import MediaRequest from './models/media-request'
import MediaService from './services/media-service'

export default class App {
    private app: express.Application
    private socket: expressWs.Application
    private port: number
    private mediaService: MediaService

    constructor(port: number) {
        this.app = express()
        this.socket = expressWs(this.app).app
        this.port = port
        this.mediaService = new MediaService()
        this.setup()
    }

    private setup() {
        // Hook up the logging
        this.app.use(morgan('tiny'))

        // expose the html public directory
        this.app.use(express.static('public'))

        // Hook up the ws endpoint
        this.socket.ws('/', (ws) => {
            ws.on('message', (msg) => {
                const data: MediaRequest = JSON.parse(msg.toString())
                this.mediaService.process(data, (res:string) => {
                    ws.send(res)
                })
            })
        })
    }

    // Make this logged properly
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on the port ${this.port}`)
        })
    }
}
