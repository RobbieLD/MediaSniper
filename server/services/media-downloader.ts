import axios from 'axios'
import stream from 'stream'
import util from 'util'
import fs from 'fs'
import path from 'path'

export default class MediaDownloader {
    private pipeline
    private downloadDir = 'tmp'

    constructor() {
        this.pipeline = util.promisify(stream.pipeline)

        if (!fs.existsSync(this.downloadDir)) {
            fs.mkdirSync(this.downloadDir)
        }
    }

    public async downloadFile(url: string, fileName: string, progress: (per: string) => void) {
        const response = await axios.get(url, {
            responseType: 'stream'
        })

        const length = Number.parseInt(response.headers['content-length'])
        let downloaded = 0
        let notifications = 1

        response.data.on('data', (chunk: Buffer) => {
            downloaded += chunk.length
            const percent = Math.round((downloaded / length) * 100)
            
            if (percent >= (notifications * 10)) {
                notifications++
                progress(`${percent}%`)
            }
        })

        const ext = path.extname(url)

        await this.pipeline(response.data, fs.createWriteStream(`tmp/${fileName}${ext}`))
    }
}
