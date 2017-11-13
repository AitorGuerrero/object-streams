import {Transform} from './transform.class';

export function map(transformFunc: (input: any) => any) {
	return new Transform({
		transform(item: any, enc: any, cb: () => void) {
			try {
				this.push(transformFunc(item));
			} catch (err) {
				this.emit('error', err);
			}
			cb();
		},
	});
}
