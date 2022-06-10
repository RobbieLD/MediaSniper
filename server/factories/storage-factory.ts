import IStorageProvider from '../interfaces/istorage-provider'
import YouTubeMusicStorageProvider from '../services/youtube-music-storage-provider'

export default class StorageFactory  {
    public static getStorageProvider(): IStorageProvider {
        if (process.env?.STORAGE_PROVIDER === 'youtubemusic') {
            return new YouTubeMusicStorageProvider()
        } else {
            throw new Error(`Storag provider ${process.env?.STORAGE_PROVIDER} is not known`)
        }
    }
}
