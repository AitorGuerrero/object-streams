import {Readable} from 'stream';
import {forEach} from './for-each';

export async function convertStreamToArray<E>(inputStream: Readable) {
	const list: E[] = [];
	inputStream.pipe(forEach((i) => list.push(i)));

	return new Promise<E[]>((rs, rj) => {
		inputStream.on('end', () => rs(list));
		inputStream.on('error', rj);
	});
}
