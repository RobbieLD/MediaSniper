import IParser from '../interfaces/IParser'
import SgParser from '../services/sg-parser'
import EchoParser from '../services/echo-parser'

export default class ParserFactory {
    public static GetParser(url: string) : IParser {
        if (url.includes('soundgasm')) {
            return new SgParser()
        }
        else if (url.includes('echo')) {
            return new EchoParser()
        }
        else {
            throw new Error(`No parser found to handle ${url}`)
        }
    }
}
