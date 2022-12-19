import { createReadStream, createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createGzip } from 'node:zlib'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'
import isFile from '../helpers/isFile.js'
import { cwd } from 'node:process'

export default async function handleCompress([file, destination = cwd()]) {

    try {
        const isDirectoryCheck = await isDirectory(destination);
        const isFileCheck = await isFile(file);

        if (!isDirectoryCheck) throw new Error("its not a directory");
        if (!isFileCheck) throw new Error("its not a file");

        const pathToFile = resolve(file);
        // const { base } = parse(pathToFile)
        const fileName = `${file}.gz`;
        const pathToDestination = resolve(destination, fileName);

        const readableStream = createReadStream(pathToFile);
        const writableStream = createWriteStream(pathToDestination);
        const gzip = createGzip();
        await pipeline(readableStream, gzip, writableStream);
        displayCurrentDirectory();
    } catch (error) {
        console.error('Operation failed');
    }
}



