import ffmpeg from 'ffmpeg'
import path from 'path'
import fs from 'fs'

export default class MetadataProcessor {
    public async writeMeta(title: string, filePath: string): Promise<string> {
        const output = `"${path.dirname(filePath)}/${title}${path.extname(filePath)}"`

        if (fs.existsSync(filePath)) {
            return 'Outoupt file already exists'
        }

        try {
            const processer = await new ffmpeg(filePath)
            processer.addCommand('-metadata', process.env?.STORAGE_META || '')
            processer.addCommand('-codec', 'copy')
            return await processer.save(output)
        }
        catch (e) {
            return (e as Error).message
        }        
    }
}