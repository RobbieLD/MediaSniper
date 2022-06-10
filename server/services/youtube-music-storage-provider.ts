import IStorageProvider from '../interfaces/istorage-provider'
import axios from 'axios'

export default class YouTubeMusicStorageProvider implements IStorageProvider {
    
    async save(progress: (msg: string) => void): Promise<void> {
        const url = `https://upload.youtube.com/upload/usermusic/http?authuser=${process.env?.X_GOOG_AUTH_USER}`
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'X-Goog-Upload-Command': 'start',
            'X-Goog-Upload-Header-Content-Length': '0',
            'X-Goog-Upload-Protocol': 'resumable',
            'x-goog-authuser': `${process.env?.X_GOOG_AUTH_USER}`,
            'X-Goog-Upload-Offset': '0'
        }

        // TODO: Write file meta data
        
        progress(`Starting upload to ${url}`)
        //https://maximorlov.com/send-a-file-with-axios-in-nodejs/

        // TODO: Add files stream here 
        const startResponse = await axios.post(url, null, { headers } )
        headers['X-Goog-Upload-Command'] = 'upload, finalize'
        const fileUrl = startResponse.headers['X-Goog-Upload-URL']

        const endResponse = await axios.post(fileUrl, null, { headers })
    }
    
}
