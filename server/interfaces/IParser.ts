export default interface IParser {
    extractDownloadLink(url: string): Promise<string>
}
