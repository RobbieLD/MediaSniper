import IParser from '../interfaces/iparser'
import axios from 'axios'

export default class SgParser implements IParser {

    public async extractDownloadLink(url: string) {
        const regexp = /https:\/\/media.soundgasm.net\/sounds\/(\d|[a-z])*.m4a/g
        const contents = await this.downloadPage(url)
        const results = contents.match(regexp) || ''
        return results[0]
    }

    private async downloadPage(url: string) {
        const res = await axios.get(url)
        return res.data
    }

}
