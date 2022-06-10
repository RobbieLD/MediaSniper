import IParser from '../interfaces/IParser'

export default class EchoParser implements IParser {
    extractDownloadLink(url: string): Promise<string> {
        return Promise.resolve(url)
    }

}
