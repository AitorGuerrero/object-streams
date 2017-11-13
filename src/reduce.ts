import {Readable, Transform} from 'stream';

export function reduce<R, D>(
	stream: Readable,
	fn: (result: R, data: D) => any,
	initial?: R,
) {
	let result: R = initial;
	const reducedStream = stream.pipe(new Transform({
		objectMode: true,
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

	return new Promise<R>((rs, rj) => {
		reducedStream.on('finish', () => rs(result));
		reducedStream.on('error', (err) => rj(err));
	});
}
