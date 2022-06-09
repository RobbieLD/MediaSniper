import express from 'express'
import IController from './interfaces/IController'
import Logger from './middleware/logger'

export default class App {
    public app: express.Application
    public port: number

    constructor(controllers: IController[], port: number) {
        this.app = express()
        this.port = port

        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    private initializeMiddlewares() {
        this.app.use(Logger.Log)
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/api/', controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`)
        })
    }
}