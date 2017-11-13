import {forEach} from './for-each';
import {Readable} from './readable.class';

export async function convertStreamToArray<E>(inputStream: Readable) {
	const list: E[] = [];
	inputStream.pipe(forEach((i) => list.push(i)));

	return new Promise<E[]>((rs, rj) => {
		inputStream.ended.then(() => rs(list), rj);
		inputStream.closed.then(() => rs(list), rj);
	});
}
