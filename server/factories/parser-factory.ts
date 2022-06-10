import IParser from '../interfaces/iparser'
import SgParser from '../services/sg-parser'
import EchoParser from '../services/echo-parser'

export default class ParserFactory {
    public static GetParser(url: string) : IParser {
        if (url.includes('soundgasm')) {
            return new SgParser()
        }
        // These are just used for testing
        else if (url.includes('echo') || url.includes('nasa')) {
            return new EchoParser()
        }
        else {
            throw new Error(`No parser found to handle ${url}`)
        }
    }
}
