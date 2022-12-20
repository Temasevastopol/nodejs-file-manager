import { rename } from 'node:fs/promises'
import { resolve, parse } from 'node:path'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleRn([file, newFile]) {
    try {
        if (/[\/\\]/g.test(newFileName)) throw new Error('invalid new_file_name')

        const pathToFile = resolve(file)
        const { dir } = parse(pathToFile)
        const pathFromFile = resolve(dir, newFile)
        await rename(pathToFile, pathFromFile)
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}
