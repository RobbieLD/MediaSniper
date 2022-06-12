export default interface IStorageProvider {
    save(filePath: string, progress: (msg: string) => void): Promise<void>
}
