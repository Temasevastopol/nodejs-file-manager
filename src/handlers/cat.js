import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import { pipeline } from 'node:stream/promises'
import { customOutput } from '../helpers/other.js'
import { createReadStream } from 'fs'
import path  from 'node:path'



export default async function handleCat([file]) {   
    if(file === 'help'){
        console.info('Help info cat <File to read>')
    }
    try {    
        const pathToFile = path.resolve(file)     
        const readableStream = createReadStream(pathToFile, { encoding: 'utf-8'})
        await pipeline(readableStream, customOutput())
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}
