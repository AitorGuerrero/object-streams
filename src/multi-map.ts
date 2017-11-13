import {Transform} from './transform.class';

export function multiMap(transformFunc: (input: any) => Promise<any[]>) {
	return new Transform({
		async transform(item: any, enc: any, cb: () => void) {
			try {
				(await transformFunc(item)).forEach((o) => this.push(o));
			} catch (err) {
				this.emit('error', err);
				throw err;
			}
			cb();
		},
	});
}
