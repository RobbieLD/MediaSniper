import IStorageProvider from '../interfaces/istorage-provider'
import axios from 'axios'

export default class YouTubeMusicStorageProvider implements IStorageProvider {
    
    async save(filePath: string, progress: (msg: string) => void): Promise<void> {
        // https://github.com/yakovkhalinsky/backblaze-b2
    }
    
}
