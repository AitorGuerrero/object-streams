import * as stream from 'stream';

export function forEach(functionToApply: (item: any) => any) {
	return new stream.Transform({
		transform(item: any, enc: any, cb: () => any) {
			try {
				functionToApply(item);
			} catch (err) {
				this.emit('error', err);
			}
			this.push(item);
			cb();
		},
	});
}
