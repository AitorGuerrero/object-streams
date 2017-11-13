import {Readable, Writable} from 'stream';
import {forEach} from './for-each';

export async function convertStreamToArray<E>(inputStream: Readable | Writable) {
	const list: E[] = [];
	inputStream.pipe(forEach((i) => list.push(i)));

	return new Promise<E[]>((rs, rj) => {
		inputStream.on('end', () => rs(list));
		inputStream.on('finish', () => rs(list));
		inputStream.on('close', () => rs(list));
		inputStream.on('error', rj);
	});
}
