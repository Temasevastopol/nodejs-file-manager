import { createReadStream,  createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createUnzip } from 'node:zlib'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'
import isFile from '../helpers/isFile.js'
import { cwd } from 'node:process'

export default async function handleDecompress([file, destination = cwd()]) {
    try {
        const isDirectoryCheck = await isDirectory(destination);
        const isFileCheck = await isFile(file);

        if (!isDirectoryCheck) throw new Error("its not a directory");
        if (!isFileCheck) throw new Error("its not a file");

        const pathToFile = resolve(file)
        const { name, ext } = parse(pathToFile)

        if (!ext.includes('gz')) throw new Error('invalid file extension')

        const pathToDestination = resolve(destination, name)

        const readableStream = createReadStream(pathToFile)
        const writableStream = createWriteStream(pathToDestination)
        const unzip = createUnzip()
        await pipeline(readableStream, unzip, writableStream)
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}
