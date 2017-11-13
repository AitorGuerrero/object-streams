import {Transform} from './transform.class';

export function filter(check: (input: any) => boolean) {
	return new Transform({
		transform(item: any, enc: any, cb: () => void) {
			try {
				if (check(item)) { this.push(item); }
			} catch (err) {
				this.emit('error', err);
			}
			cb();
		},
	});
}
