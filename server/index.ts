import dotenv from 'dotenv'
import AudioController from './controllers/AudioController'
import Server from './server'

dotenv.config()

const portValue = parseInt(process.env.SERVER_PORT || '')
const port = Number.isInteger(portValue) ? portValue : 8080

const app = new Server(
    [
        new AudioController(),
    ],
    port,
)

app.listen()
