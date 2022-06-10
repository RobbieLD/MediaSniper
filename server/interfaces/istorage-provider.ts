export default interface IStorageProvider {
    save(progress: (msg: string) => void): Promise<void>
}
