import {Readable} from 'stream';
import {Transform} from './transform.class';

export function reduce<R, D>(
	stream: Readable,
	fn: (result: R, data: D) => any,
	initial?: R,
) {
	let result: R = initial;
	const reducedStream = stream.pipe(new Transform({
		transform(data: any, encoding: string, cb: () => any) {
			try {
				if (result === undefined) {
					result = data;
				} else {
					result = fn(result, data);
				}

			} catch (err) {
				this.emit('err', err);
			}
			cb();
		},
	}));

	return reducedStream.finished;
}
