import ParserFactory from '../factories/parser-factory'
import MediaDownloader from '../services/media-downloader'
import MediaRequest from '../models/media-request'
import StorageFactory from '../factories/storage-factory'
import MetadataService from '../services/metadata-service'

export default class MediaController {
    private downloader
    private storage
    private meta

    constructor() {
        this.downloader = new MediaDownloader()
        this.storage = StorageFactory.getStorageProvider()
        this.meta = new MetadataService()
    }

    public async process(req: MediaRequest, progress: (r: string) => void) {
        const mediaUrl = await this.getMediaUrl(req.url, progress)
        progress(`Media url found: ${mediaUrl}`)
        progress('Starting media download ...')
        
        const filePath = await this.downloadMedia(mediaUrl, progress)
        progress(`Media download finished: ${filePath}`)
        
        progress(`Tagging media with metadata ${process.env?.STORAGE_META} and file name '${req.title}'`)
        const result = await this.meta.writeMeta(req.title, filePath)
        progress(`Tagging done with result: ${result || 'success'}`)

        //progress(`Starting upload to ${this.storage.constructor.name}`)
        //await this.storage.save(progress)
        //progress('Processing complete')        
    }

    private async downloadMedia(url: string, progressCallback: (progress: string) => void): Promise<string> {
        return await this.downloader.downloadFile(url, progressCallback)
    }

    private async getMediaUrl(url: string, pn: (v: string) => void): Promise<string> {
        const parser = ParserFactory.GetParser(url)
        pn(`Parser Selected: ${parser.constructor.name}`)
        const link = await parser.extractDownloadLink(url)
        return link
    }
}
