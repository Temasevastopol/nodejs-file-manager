import { chdir } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleCd([pathToDirectory]) {
    if (pathToDirectory === 'help'){
        console.info('Help info - cd <Directory>')
        return
    }
    try {
        
        chdir(pathToDirectory)
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}

