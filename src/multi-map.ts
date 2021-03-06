import {Transform} from './transform.class';

export function multiMap(transformFunc: (input: any) => any[]) {
	return new Transform({
		async transform(item: any, enc: any, cb: () => void) {
			try {
				transformFunc(item).forEach((o) => this.push(o));
			} catch (err) {
				this.emit('error', err);
				throw err;
			}
			cb();
		},
	});
}
