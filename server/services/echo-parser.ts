import IParser from '../interfaces/iparser'

export default class EchoParser implements IParser {
    extractDownloadLink(url: string): Promise<string> {
        return Promise.resolve(url)
    }

}
