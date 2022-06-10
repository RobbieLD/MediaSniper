import ParserFactory from '../factories/parser-factory'
import MediaDownloader from './media-downloader'
import MediaRequest from '../models/media-request'

export default class MediaService {
    private downloader

    constructor() {
        this.downloader = new MediaDownloader()
    }

    public async process(req: MediaRequest, progress: (r: string) => void) {
        const mediaUrl = await this.getMediaUrl(req.url)
        progress(`Media url found: ${mediaUrl}`)
        progress('Starting media download')
    }

    private async downloadMedia(url: string) {
        await this.downloadMedia(url)
    }

    private async getMediaUrl(url: string): Promise<string> {
        const parser = ParserFactory.GetParser(url)
        const link = await parser.extractDownloadLink(url)
        return link
    }
}
