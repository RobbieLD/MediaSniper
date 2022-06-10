import ParserFactory from '../factories/parser-factory'
import MediaDownloader from './media-downloader'
import MediaRequest from '../models/media-request'
import StorageFactory from '../factories/storage-factory'
export default class MediaService {
    private downloader
    private storage

    constructor() {
        this.downloader = new MediaDownloader()
        this.storage = StorageFactory.getStorageProvider()
    }

    public async process(req: MediaRequest, progress: (r: string) => void) {
        const mediaUrl = await this.getMediaUrl(req.url, progress)
        progress(`Media url found: ${mediaUrl}`)
        progress('Starting media download ...')
        await this.downloadMedia(req.url, req.fileName, progress)
        progress('Media download finished')
        progress(`Starting upload to ${this.storage.constructor.name}`)
        await this.storage.save(progress)
        progress('Processing complete')
    }

    private async downloadMedia(url: string, fileName: string, progressCallback: (progress: string) => void) {
        await this.downloader.downloadFile(url, fileName, progressCallback)
    }

    private async getMediaUrl(url: string, pn: (v: string) => void): Promise<string> {
        const parser = ParserFactory.GetParser(url)
        pn(`Parser Selected: ${parser.constructor.name}`)
        const link = await parser.extractDownloadLink(url)
        return link
    }
}
