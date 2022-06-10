import axios from 'axios'
import stream from 'stream'
import util from 'util'
import fs from 'fs'

// TODO: Get progress notifications
export default class MediaDownloader {
    private pipeline

    constructor() {
        this.pipeline = util.promisify(stream.pipeline)
    }

    public async downloadFile(url: string, fileName: string) {
        const response = await axios.get(url, {
            responseType: 'stream'
        })

        await this.pipeline(response.data, fs.createWriteStream(`tmp/${fileName}.m4a`))
    }
}
