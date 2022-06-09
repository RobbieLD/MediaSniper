import { Request, Response, Router } from 'express'
import IController from '../interfaces/IController'
import axios from 'axios'
import stream from 'stream'
import util from 'util'
import fs from 'fs'

export default class AudioController implements IController {
    public path = '/audio'
    public router

    constructor() {
        this.router = Router()
        this.intializeRoutes()
    }

    public intializeRoutes() {
        this.router.get(this.path, this.processAudio.bind(this))
    }

    // TODO: Make this more generic with a configurable download service
    private async processAudio(request: Request, response: Response) {
        const fileName = request.query.fileName?.toString()
        const url = request.query.url?.toString()
        
        if (!fileName || !url) {
            throw new Error('File Name or Url is missing')
        }

        const page = await this.downloadPage(url)
        const link = this.extractLink(page)
        await this.downloadFile(link, fileName)
        response.send('File Finished Processing')
    }

    // TODO: Add propper logging
    private async downloadFile(url: string, fileName: string) {
        const response = await axios.get(url, {
            responseType: 'stream'
        })

        const pipeline = util.promisify(stream.pipeline)
        await pipeline(response.data, fs.createWriteStream(`tmp/${fileName}.m4a`))
    }

    // TODO: Survive errors and log them and return the response
    private extractLink(contents: string) {
        const regexp = /https:\/\/media.soundgasm.net\/sounds\/(\d|[a-z])*.m4a/g
        const results = contents.match(regexp) || ''
        return results[0]
    }

    private async downloadPage(url: string) {
        const res = await axios.get(url)
        return res.data
    }
}