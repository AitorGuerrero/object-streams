import * as stream from 'stream';
import Apply from './apply.class';

export default async function convertStreamToArray<E>(inputStream: stream.Readable): Promise<E[]> {
	const list: E[] = [];
	inputStream.pipe(new Apply((i) => list.push(i)));

	return new Promise<E[]>((rs, rj) => {
		inputStream.on('finish', () => rs(list));
		inputStream.on('close', () => rs(list));
		inputStream.on('end', () => rs(list));
		inputStream.on('error', (err: any) => rj(err));
	});
}